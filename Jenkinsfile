pipeline {
    agent any

    environment {
        REGISTRY_URL = "registry.georgio-sorin.fr"
        DOCKER_IMAGE_NAME = "api-webflow"
    }

    stages {
        stage('Check Docker Version') {
            steps {
                sh 'docker --version'
            }
        }
        stage('build-branch') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'REGISTRY_CREDENTIALS', passwordVariable: 'DOCKER_CREDENTIALS_PSW', usernameVariable: 'DOCKER_CREDENTIALS_USR')]) {
                        sh 'docker login -u $DOCKER_CREDENTIALS_USR -p ${DOCKER_CREDENTIALS_PSW} ${REGISTRY_URL}'
                        def packageVersion = readFile('package.json').trim().split('"version": "')[1].split('"')[0]
                        sh "docker build -t ${REGISTRY_URL}/${DOCKER_IMAGE_NAME}:${packageVersion} ."
                        sh "docker push ${REGISTRY_URL}/${DOCKER_IMAGE_NAME}:${packageVersion}"
                    }
                }
            }
        }
    }
}