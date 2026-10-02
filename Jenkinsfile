pipeline {
  agent any
  environment {
    APP_NAME = 'cicd-poc'
  }
  stages {
    // ---------- Runs only for PRs targeting dev ----------
    stage('SonarQube Analysis') {
      when { changeRequest target: 'dev' }
      steps {
        script {
          def scannerHome = tool 'sonar-scanner'
          withSonarQubeEnv('sonarqube') {
            sh "${scannerHome}/bin/sonar-scanner"
          }
        }
      }
    }
    stage('Quality Gate') {
      when { changeRequest target: 'dev' }
      steps {
        timeout(time: 5, unit: 'MINUTES') {
          waitForQualityGate abortPipeline: true   // fails build → red check on PR
        }
      }
    }

    // ---------- Runs only when code lands on dev ----------
    stage('Build Image') {
      when { branch 'dev' }
      steps {
        sh "docker build -t ${APP_NAME}:dev-${BUILD_NUMBER} -t ${APP_NAME}:dev ."
      }
    }
    stage('Deploy dev-container') {
      when { branch 'dev' }
      steps {
        sh '''
          docker rm -f dev-container || true
          docker run -d --name dev-container -p 3000:3000 cicd-poc:dev
        '''
      }
    }
  }
}