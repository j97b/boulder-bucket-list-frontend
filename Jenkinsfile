pipeline {
    agent any
    stages {
        stage('--Build front-end--') {
            steps {
                sh "docker build -t bbl-frontend ."
            }
        }
        stage('--Push docker image--') {
            steps {
                sh "docker login -u ${env.DOCKER_USER} -p ${env.DOCKER_PSSWRD}"
                sh "docker tag bbl-frontend tigs1995/bbl-frontend"
                sh "docker push tigs1995/bbl-frontend"
            }
        }
        stage('--Deploy to test environment--') {
            steps {
                sh "ssh -i /home/jenkins/project.pem ubuntu@ec2-35-176-135-139.eu-west-2.compute.amazonaws.com './script.sh'"
            }
        }
         stage('--Deploy to production environment--') {
            steps {
                sh "ssh -i /home/jenkins/project.pem ubuntu@ec2-3-8-31-147.eu-west-2.compute.amazonaws.com './script.sh'"
            }
        }
    }
}
