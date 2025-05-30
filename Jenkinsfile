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

    // Etapa 3: Pruebas Paralelizadas
    // stage('Pruebas en Paralelo') {
    //   parallel {
    //     stage('Pruebas Chrome') {
    //       steps {
    //         script {
    //           try {
    //             dir("${env.WORKSPACE}") {
    //               sh '''
    //                 ls -l jest.config.js jest.setup.js package.json package-lock.json
    //                 rm -rf chrome-test
    //                 mkdir chrome-test
    //                 cp -r node_modules src public test jest.config.js jest.setup.js package.json package-lock.json chrome-test/
    //               '''
    //               dir('chrome-test') {
    //                 def output = sh(
    //                   script: '''
    //                     export JEST_JUNIT_OUTPUT=junit.xml
    //                     npm test -- --watchAll=false --ci --reporters=jest-junit
    //                     mv junit.xml ../junit-chrome.xml
    //                   ''',
    //                   returnStdout: true
    //                 )
    //                 echo output
    //               }
    //             }
    //             junit 'junit-chrome.xml'
    //           } catch (err) {
    //             echo "¡Error en las pruebas Chrome!"
    //             echo "Mensaje de error: ${err}"
    //           }
    //         }
    //       }
    //     }
    //     stage('Pruebas Firefox') {
    //       steps {
    //         script {
    //           try {
    //             dir("${env.WORKSPACE}") {
    //               sh '''
    //                 ls -l jest.config.js jest.setup.js package.json package-lock.json
    //                 rm -rf firefox-test
    //                 mkdir firefox-test
    //                 cp -r node_modules src public test jest.config.js jest.setup.js package.json package-lock.json firefox-test/
    //               '''
    //               dir('firefox-test') {
    //                 def output = sh(
    //                   script: '''
    //                     export JEST_JUNIT_OUTPUT=junit.xml
    //                     npm test -- --watchAll=false --ci --reporters=jest-junit
    //                     mv junit.xml ../junit-firefox.xml
    //                   ''',
    //                   returnStdout: true
    //                 )
    //                 echo output
    //               }
    //             }
    //             junit 'junit-firefox.xml'
    //           } catch (err) {
    //             echo "¡Error en las pruebas Firefox!"
    //             echo "Mensaje de error: ${err}"
    //           }
    //         }
    //       }
    //     }
    //   }
    // }

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
