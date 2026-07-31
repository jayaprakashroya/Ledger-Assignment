@echo off
setlocal enabledelayedexpansion

set MAVEN_PROJECTBASEDIR=%~dp0
set WRAPPER_DIR=%MAVEN_PROJECTBASEDIR%.mvn\wrapper
set WRAPPER_JAR=%WRAPPER_DIR%\maven-wrapper.jar
set JAVA_BIN=%JAVA_HOME%\bin\java.exe
if not exist "%JAVA_BIN%" set JAVA_BIN=java

if not exist "%WRAPPER_JAR%" (
  echo Maven wrapper JAR not found: %WRAPPER_JAR%
  exit /b 1
)

"%JAVA_BIN%" -jar "%WRAPPER_JAR%" %*
