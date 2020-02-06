pipeline {
    agent any
    stages {
        stage('--Build front-end--') {
            steps {
                sh "docker build -t bbl-frontend ."
            }
        }
        stage('--Push image to docker--') {
            steps {
                sh "docker login -u ${env.DOCKER_USER} -p ${env.DOCKER_PSSWRD}"
                sh "docker tag bbl-frontend tigs1995/bbl-frontend"
                sh "docker push tigs1995/bbl-frontend"
            }
        }
//        stage('--Deploy--') {
//            steps {
//                sh "ssh -i 'project.pem' ubuntu@ec2-35-176-135-139.eu-west-2.compute.amazonaws.com"
//          }
//        }
    }
}
