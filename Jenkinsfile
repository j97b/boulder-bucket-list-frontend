pipeline {
    agent any
    stages {
        stage('--Build front-end--') {
            steps {
                sh "docker build -t bbl-frontend-test ."
            }
        }
        stage('--deploy--') {
            steps {
                sh "docker login -u ${env.DOCKER_USER} -p ${env.DOCKER_PSSWRD}"
                sh "docker tag bbl-frontend-test tigs1995/bbl-frontend-test"
                sh "docker push tigs1995/bbl-frontend-test"
            }
        }
    }
}
