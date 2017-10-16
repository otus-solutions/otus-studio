pipeline {
  agent any
  tools {
     maven 'maven 3.5.0'
     jdk 'Java8'
   }
   node('node'){

    stages {
      // stage('Clean workspace') {
      //   deleteDir()
      // }
      // stage('Checkout'){
      //   checkout scm
      // }

      stage('Build') {
        sh "rm -rf node_modules/"
        sh "npm install"
        sh "npm run build"
        sh "npm run test"
      }

      stage('Update Docs') {
        sh "npm run gulp sonar --sonarUrl='${URL_SONAR}' --sonarDatabaseUrl='${DATABASE_SONAR}' --sonarDatabaseUsername='${USER_SONAR}' --sonarDatabasePassword='${PWD_SONAR}'"
      }


      stage('Development Deploy') {
        sh "rm -rf node_modules/"
        sh "npm install --production"
        sh "mvn antrun:run@static-deploy -Dscp.user='${SERVER_USER}' -Dscp.host='${SERVER_HOST}' -Dscp.target='${SERVER_TARGET}' -Dscp.password='${SERVER_PWD}'"
      }

      // stage('Homologation Deploy') {
      //   sh "npm install"
      //   sh "npm run build"
      //   sh "rm -rf node_modules/"
      //   sh "npm install --production"
      //   sh "mvn antrun:run@static-deploy -Dscp.user='${SERVER_USER}' -Dscp.host='${SERVER_HOST}' -Dscp.target='${SERVER_TARGET}' -Dscp.password='${SERVER_PWD}'"
      // }
      //
      // stage('Production Deploy') {
      //   sh "npm install"
      //   sh "npm run build"
      //   sh "rm -rf node_modules/"
      //   sh "npm install --production"
      //   sh "mvn antrun:run@static-deploy -Dscp.user='${SERVER_USER}' -Dscp.host='${SERVER_HOST}' -Dscp.target='${SERVER_TARGET}' -Dscp.password='${SERVER_PWD}'"
      // }

      stage('Cleanup'){
        echo 'prune and cleanup'
        sh 'npm prune'
        sh 'rm node_modules -rf'
      }

    }
  }

}
