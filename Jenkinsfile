pipeline { // Inicia la definición del pipeline de Jenkins
  agent any // Ejecuta el pipeline en cualquier agente disponible
  tools {
    nodejs 'Node_24' // Usa la versión de Node.js llamada 'Node_24' configurada en Jenkins
  }
  stages { // Define las etapas del pipeline
    // Etapa 1: Checkout
    stage('Checkout') { // Etapa para obtener el código fuente
      steps {
        git branch: 'main', url: 'https://github.com/nicolas1996-ing/gif-expert-app.git' // Clona el repositorio desde GitHub, rama main
      }
    }
    // Etapa 2: Build
    stage('Build') { // Etapa de construcción del proyecto
      steps {
        sh 'npm install' // Instala las dependencias del proyecto
        sh 'npm install --save-dev jest-junit' // Instala jest-junit como dependencia de desarrollo para reportes de pruebas
        sh 'npm run build' // Ejecuta el script de build definido en package.json
        sh 'ls -l dist' // Lista los archivos generados en la carpeta dist
        sh 'npm install -g vercel'
      }
    }

    stage('Pruebas Unitarias') { // Etapa para ejecutar pruebas unitarias
      steps {
        sh 'npm test -- --watchAll=false --ci --reporters=default --reporters=jest-junit' // Ejecuta las pruebas unitarias y genera reporte JUnit
      }
      post {
        always {
          junit 'junit.xml' // Publica el reporte de pruebas en Jenkins
          archiveArtifacts artifacts: 'junit.xml', allowEmptyArchive: true // Archiva el reporte junit.xml, aunque esté vacío
        }
      }
    }

    // Pruebas en Paralelo
    stage('Pruebas en Paralelo') { // Etapa para ejecutar pruebas en paralelo en diferentes navegadores
      parallel {
        // Pruebas en Chrome
        stage('Pruebas Chrome') { // Sub-etapa para pruebas en Chrome
          steps {
            script {
              try {
                sh '''
                  mkdir -p chrome-test // Crea carpeta para pruebas en Chrome
                  cp -r node_modules src public test jest.config.js jest.setup.js package.json package-lock.json .babelrc chrome-test/ // Copia archivos necesarios
                  cd chrome-test // Entra a la carpeta
                  export JEST_JUNIT_OUTPUT=junit.xml && npm test -- --browser=chrome --watchAll=false --ci --reporters=jest-junit // Ejecuta pruebas en Chrome y genera reporte
                  mv junit.xml ../junit-chrome.xml // Mueve el reporte generado a la raíz
                '''
                sh 'ls -l' // Lista archivos en el directorio actual
                sh 'find . -name "junit*.xml"' // Busca archivos de reporte junit
                sh 'cat junit-chrome.xml || echo "No se generó junit-chrome.xml"' // Muestra el contenido del reporte o un mensaje si no existe
                junit 'junit-chrome.xml' // Publica el reporte de pruebas de Chrome en Jenkins
              } catch (err) {
                echo "Pruebas en Chrome fallaron: ${err}" // Muestra mensaje de error si fallan las pruebas
                currentBuild.result = 'UNSTABLE' // Marca el build como inestable
              }
            }
          }
        }
        // Pruebas en Firefox
        stage('Pruebas Firefox') { // Sub-etapa para pruebas en Firefox
          steps {
            script {
              try {
                sh '''
                  mkdir -p firefox-test // Crea carpeta para pruebas en Firefox
                  cp -r node_modules src public test jest.config.js jest.setup.js package.json package-lock.json .babelrc firefox-test/ // Copia archivos necesarios
                  cd firefox-test // Entra a la carpeta
                  export JEST_JUNIT_OUTPUT=junit.xml && npm test -- --browser=firefox --watchAll=false --ci --reporters=jest-junit // Ejecuta pruebas en Firefox y genera reporte
                  mv junit.xml ../junit-firefox.xml // Mueve el reporte generado a la raíz
                '''
                sh 'ls -l' // Lista archivos en el directorio actual
                sh 'find . -name "junit*.xml"' // Busca archivos de reporte junit
                sh 'cat junit-firefox.xml || echo "No se generó junit-firefox.xml"' // Muestra el contenido del reporte o un mensaje si no existe
                junit 'junit-firefox.xml' // Publica el reporte de pruebas de Firefox en Jenkins
              } catch (err) {
                echo "Pruebas en Firefox fallaron: ${err}" // Muestra mensaje de error si fallan las pruebas
                currentBuild.result = 'UNSTABLE' // Marca el build como inestable
              }
            }
          }
        }
      }
    }

    // Etapa 4: Deploy Simulado
    stage('Deploy a Producción (Simulado)') { // Etapa para simular el despliegue a producción
      steps {
        script {
          // Crear carpeta "prod" y copiar build
          sh 'mkdir -p prod' // Crea la carpeta prod si no existe
          sh 'cp -r dist/* prod/' // Copia los archivos generados en dist a prod
          echo "¡Deploy simulado exitoso! Archivos copiados a /prod" // Mensaje de éxito
        }
      }
    }
  }

  // post { // Acciones a ejecutar después de todas las etapas
  //   always {
  //     mail(
  //       to: 'josenicolasaristizabalramirez@gmail.com', // Correo de destino
  //       subject: "Build Status: ${currentBuild.currentResult}", // Asunto con el estado del build
  //       body: "Job: ${env.JOB_NAME}\nEstado: ${currentBuild.currentResult}\nURL: ${env.BUILD_URL}" // Cuerpo del correo con detalles del build
  //     )
  //     // Limpiar workspace
  //     cleanWs() // Limpia el espacio de trabajo de Jenkins
  //   }
  // }
  stage('Deploy a Producción') {
    steps {
      withCredentials([string(credentialsId: 'VERCEL_TOKEN', variable: 'VERCEL_TOKEN')]) {
        sh 'npx vercel --prod --token=$VERCEL_TOKEN --confirm'
        echo "¡Deploy real a Vercel exitoso!"
      }
  }
}
}
