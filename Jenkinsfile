
pipeline {
    agent any

    tools {
        nodejs 'NodeJS-20'
    }

    stages {
        stage('Checkout') {
            steps {
                echo 'Checking out Placement Portal project'
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm ci'
            }
        }

        stage('ESLint') {
            steps {
                bat 'npm run lint'
            }
        }

        stage('Jest Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Backend Syntax Check') {
            steps {
                bat 'node --check Backend/server.js'
            }
        }

        stage('Frontend Syntax Check') {
            steps {
                bat 'node --check Frontend/script.js'
            }
        }
    }

    post {
        success {
            echo 'Placement Portal CI Pipeline Successful!'
        }
        failure {
            echo 'Pipeline Failed. Please check the error logs.'
        }
    }
}
