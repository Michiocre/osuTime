pipeline {
  agent {
    docker {
      image 'node:10'
      args '-p 3000:3000'
    }

  }
  stages {
    stage('Build') {
      parallel {
        stage('Install') {
          steps {
            sh 'npm install'
          }
        }
        stage('Install Server') {
          steps {
            sh 'cd server && npm install'
          }
        }
        stage('Install Client') {
          steps {
            sh 'cd client && npm install'
          }
        }
      }
    }
  }
}