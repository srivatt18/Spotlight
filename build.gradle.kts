plugins {
    id("java")
}

group = "org.example"
version = "1.0-SNAPSHOT"

repositories {
    mavenCentral()
}

dependencies {
    // JUnit for testing
    testImplementation(platform("org.junit:junit-bom:5.10.0"))
    testImplementation("org.junit.jupiter:junit-jupiter")

    // Spring Security Crypto for Argon2PasswordEncoder
    implementation("org.springframework.security:spring-security-crypto:6.2.2")
    implementation("org.bouncycastle:bcprov-jdk15on:1.70")
    implementation("commons-logging:commons-logging:1.2")
}

tasks.test {
    useJUnitPlatform()
}
