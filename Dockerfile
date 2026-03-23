# Use Maven image to build the Spring Boot application
FROM eclipse-temurin:17-jdk-alpine AS build

WORKDIR /app

# Install Maven
RUN apk add --no-cache maven

# Copy pom.xml first for better Docker layer caching
COPY backend/pom.xml ./backend/
COPY backend/src ./backend/src

# Build the application
WORKDIR /app/backend
RUN mvn clean package -DskipTests

# Use Eclipse Temurin 17 runtime image
FROM eclipse-temurin:17-jre-alpine

WORKDIR /app

# Copy the built JAR file
COPY --from=build /app/backend/target/*.jar app.jar

# Expose port 8080
EXPOSE 8080

# Run the application
ENTRYPOINT ["java", "-jar", "app.jar"]
