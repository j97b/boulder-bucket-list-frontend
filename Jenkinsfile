pipeline {
    agent any
    stages {
        stage('--Isolate frontend folder--') {
            steps {
                sh "cd src/main/resources/static/"
            }
        }
        stage('--Build front-end--') {
            steps {
                sh "docker build -f DockerfileFrontend -t bbl-frontend-test ."
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