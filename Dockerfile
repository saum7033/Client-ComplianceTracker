# Use Maven image to build the Spring Boot application
FROM maven:3.9-openjdk-17 AS build

WORKDIR /app

# Copy pom.xml first for better Docker layer caching
COPY backend/pom.xml ./backend/
COPY backend/src ./backend/src

# Build the application
WORKDIR /app/backend
RUN mvn clean package -DskipTests

# Use OpenJDK 17 runtime image
FROM openjdk:17-jdk-slim

WORKDIR /app

# Copy the built JAR file
COPY --from=build /app/backend/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
