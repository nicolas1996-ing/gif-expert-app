pipeline {
  agent any
  tools {
    nodejs 'Node_24' // Configurado en Global Tools
  }
  stages {
    // Etapa 1: Checkout
    stage('Checkout') {
      steps {
        git branch: 'main', url: 'https://github.com/nicolas1996-ing/gif-expert-app.git'
      }
    }
    // Etapa 2: Build
    stage('Build') {
      steps {
        sh 'npm install'
        sh 'npm install --save-dev jest-junit'
        sh 'npm run build'
        sh 'ls -l dist'
      }
    }

    stage('Pruebas Unitarias') {
      steps {
        sh 'npm test -- --watchAll=false --ci --reporters=default --reporters=jest-junit' // Genera reporte JUnit
      }
      post {
        always {
          junit 'junit.xml' // Publica reporte en Jenkins
          archiveArtifacts artifacts: 'junit.xml', allowEmptyArchive: true
        }
      }
    }

    // Pruebas en Paralelo
    stage('Pruebas en Paralelo') {
      parallel {
        // Pruebas en Chrome
        stage('Pruebas Chrome') {
          steps {
            script {
              try {
                sh '''
                  mkdir -p chrome-test
                  cp -r node_modules src public test jest.config.js jest.setup.js package.json package-lock.json .babelrc chrome-test/
                  cd chrome-test
                  export JEST_JUNIT_OUTPUT=junit.xml && npm test -- --browser=chrome --watchAll=false --ci --reporters=jest-junit
                  mv junit.xml ../junit-chrome.xml
                '''
                sh 'ls -l'
                sh 'find . -name "junit*.xml"'
                sh 'cat junit-chrome.xml || echo "No se generó junit-chrome.xml"'
                junit 'junit-chrome.xml'
              } catch (err) {
                echo "Pruebas en Chrome fallaron: ${err}"
                currentBuild.result = 'UNSTABLE'
              }
            }
          }
        }
        // Pruebas en Firefox
        stage('Pruebas Firefox') {
          steps {
            script {
              try {
                sh '''
                  mkdir -p firefox-test
                  cp -r node_modules src public test jest.config.js jest.setup.js package.json package-lock.json .babelrc firefox-test/
                  cd firefox-test
                  export JEST_JUNIT_OUTPUT=junit.xml && npm test -- --browser=firefox --watchAll=false --ci --reporters=jest-junit
                  mv junit.xml ../junit-firefox.xml
                '''
                sh 'ls -l'
                sh 'find . -name "junit*.xml"'
                sh 'cat junit-firefox.xml || echo "No se generó junit-firefox.xml"'
                junit 'junit-firefox.xml'
              } catch (err) {
                echo "Pruebas en Firefox fallaron: ${err}"
                currentBuild.result = 'UNSTABLE'
              }
            }
          }
        }
      }
    }

    // Etapa 4: Deploy Simulado
    stage('Deploy a Producción (Simulado)') {
      steps {
        script {
          // Crear carpeta "prod" y copiar build
          sh 'mkdir -p prod'
          sh 'cp -r dist/* prod/'
          echo "¡Deploy simulado exitoso! Archivos copiados a /prod"
        }
      }
    }
  }

  post {
    always {
      mail(
        to: 'josenicolasaristizabalramirez@gmail.com',
        subject: "Build Status: ${currentBuild.currentResult}",
        body: "Job: ${env.JOB_NAME}\nEstado: ${currentBuild.currentResult}\nURL: ${env.BUILD_URL}"
      )
      // Limpiar workspace
      cleanWs()
    }
  }
}
