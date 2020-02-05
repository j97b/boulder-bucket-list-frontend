pipeline {
    agent any
    stages {
        stage('--Build front-end--') {
            steps {
                sh "docker build -t bbl-frontend-production ."
            }
        }
        stage('--deploy--') {
            steps {
                sh "docker login -u ${env.DOCKER_USER} -p ${env.DOCKER_PSSWRD}"
                sh "docker tag bbl-frontend-production tigs1995/bbl-frontend-production"
                sh "docker push tigs1995/bbl-frontend-production"
            }
        }
    }
}
