package com.booking.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestTemplate;
import com.fasterxml.jackson.databind.ObjectMapper;
import java.util.HashMap;
import java.util.Map;
import java.util.List;
import java.util.Arrays;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/chat")
@CrossOrigin(origins = "http://localhost:3000")
public class ChatController {

    private static final Logger logger = LoggerFactory.getLogger(ChatController.class);

    @Value("${openai.api.key}")
    private String openaiApiKey;

    private final String OPENAI_API_URL = "https://api.openai.com/v1/chat/completions";
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final List<String> bookingKeywords = Arrays.asList(
        "book", "booking", "reserve", "reservation", "cancel", "cancellation",
        "modify", "change", "amenities", "check-in", "check-out", "price",
        "payment", "refund", "policy", "policies"
    );

    @PostMapping("/send")
    public ResponseEntity<Map<String, String>> sendMessage(@RequestBody Map<String, String> request) {
        try {
            logger.info("Received request: {}", request);
            
            if (request == null || request.get("message") == null) {
                logger.error("Invalid request: message is null");
                return ResponseEntity.badRequest().body(Map.of("error", "Message is required"));
            }

            String message = request.get("message").toLowerCase();
            logger.info("Processing message: {}", message);

            // Prepare headers
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.setBearerAuth(openaiApiKey);
            logger.info("Headers prepared with API key: {}", openaiApiKey != null && !openaiApiKey.isEmpty());

            // Prepare request body
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "gpt-3.5-turbo");
            requestBody.put("messages", new Object[]{
                Map.of("role", "system", "content", "You are a helpful booking assistant."),
                Map.of("role", "user", "content", message)
            });
            requestBody.put("temperature", 0.7);

            // Create request entity
            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);
            logger.info("Request entity created");

            // Send request to OpenAI
            RestTemplate restTemplate = new RestTemplate();
            logger.info("Sending request to OpenAI...");
            ResponseEntity<String> response = restTemplate.postForEntity(
                OPENAI_API_URL,
                requestEntity,
                String.class
            );

            logger.info("OpenAI Response Status: {}", response.getStatusCode());
            logger.info("OpenAI Response Body: {}", response.getBody());

            // Parse the response
            Map<String, Object> responseMap = objectMapper.readValue(response.getBody(), Map.class);
            
            if (!responseMap.containsKey("choices")) {
                logger.error("No choices in OpenAI response");
                throw new RuntimeException("No choices in OpenAI response");
            }

            List<?> choices = (List<?>) responseMap.get("choices");
            if (choices.isEmpty()) {
                logger.error("Empty choices in OpenAI response");
                throw new RuntimeException("Empty choices in OpenAI response");
            }

            Map<String, Object> firstChoice = (Map<String, Object>) choices.get(0);
            Map<String, Object> messageObj = (Map<String, Object>) firstChoice.get("message");
            String botResponse = (String) messageObj.get("content");

            logger.info("Bot response: {}", botResponse);

            // Check if the message contains booking-related keywords
            boolean isBookingRelated = bookingKeywords.stream().anyMatch(message::contains);
            if (!isBookingRelated) {
                botResponse = "I notice your question isn't directly related to bookings. I'm here to help with booking-related queries. " +
                             "Would you like to know about our booking process, available properties, or any other booking-related information?";
            }

            // Return the response
            return ResponseEntity.ok(Map.of("response", botResponse));
        } catch (Exception e) {
            logger.error("Error processing chat message", e);
            return ResponseEntity.status(500)
                .body(Map.of("error", "Error processing your request: " + e.getMessage()));
        }
    }
} 