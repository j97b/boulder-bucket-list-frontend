pipeline {
    agent any
    stages {
        stage('--Build front-end--') {
            steps {
                sh "docker build -t bbl-frontend-test ."
            }
        }
        stage('--Push image to docker--') {
            steps {
                sh "docker login -u ${env.DOCKER_USER} -p ${env.DOCKER_PSSWRD}"
                sh "docker tag bbl-frontend-test tigs1995/bbl-frontend-test"
                sh "docker push tigs1995/bbl-frontend-test"
            }
        }
        stage('--Deploy--') {
            steps {
                sh "ssh -i /home/jenkins/project.pem ubuntu@ec2-35-176-135-139.eu-west-2.compute.amazonaws.com './script.sh'"
          }
        }
    }
}
