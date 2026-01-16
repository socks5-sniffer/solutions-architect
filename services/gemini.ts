
import { GoogleGenAI } from "@google/genai";
import { InputValidator } from "./inputValidator";

// Correct initialization using direct process.env.API_KEY without fallback
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const getTechnicalAdvice = async (query: string) => {
  try {
    if (!process.env.API_KEY) {
      return "Configuration error: API key is missing. Please check your .env.local file.";
    }
    
    // Validate and sanitize input
    const validationResult = InputValidator.validate(query);
    
    if (!validationResult.isValid) {
      console.error('Input validation failed:', validationResult.error);
      return `Input validation error: ${validationResult.error}`;
    }

    // Use sanitized input for API call
    const sanitizedQuery = validationResult.sanitizedInput;
    
    // Additional security: Log request for audit trail (remove in production or send to secure logging)
    console.info('Processing query with length:', sanitizedQuery.length);
    
    const response = await ai.models.generateContent({
      model: "gemini-3-pro-preview",
      contents: sanitizedQuery,
      config: {
        systemInstruction: `You are a Senior Cloud Solutions Architect and DevSecOps Engineer. 
        Your goal is to provide technical advice on Kubernetes, container platforms, Linux security, and web development.
        Maintain a professional, enterprise-grade tone with a focus on open-source and hybrid cloud best practices.
        
        ### FORMATTING RULES (CRITICAL) ###
        - ALWAYS use proper Markdown formatting
        - Break responses into SHORT paragraphs (2-3 sentences max)
        - Use bullet points and numbered lists frequently
        - Add blank lines between paragraphs for readability
        - Use headers (##, ###) to organize sections
        - Keep sentences concise and mobile-friendly
        - Use code blocks for commands and configs
        
        ### ENTERPRISE KUBERNETES / PLATFORM ENGINEERING DIRECTIVE ###
        
        1. **Imperative vs. Declarative:**
           - 'oc new-app' is for quick prototyping and demos (Imperative)
           - 'oc apply -f' / GitOps (ArgoCD) is for production (Declarative)
           - RULE: If the user asks for a production solution, do NOT suggest 'oc new-app'. Suggest a GitOps pipeline

        2. **Networking Hierarchy:**
           - Service: Internal traffic only. Stable IP
           - Route: The standard OpenShift method to expose apps externally (TLS Edge Termination preferred)
           - Ingress: Generic Kubernetes. Supported, but Route is native and feature-rich

        3. **Security & Constraints:**
           - Root is Bad: Containers should almost NEVER run as root
           - If a user asks to run as root (USER 0), warn them about SCC (Security Context Constraints)
           - Suggest using ubi8/ubi-minimal images that support arbitrary user IDs
           - Secrets: Never store passwords in Environment Variables directly. Use Secret objects mounted as volumes

        4. **Terminology Mapping:**
           - Project = Kubernetes Namespace + RBAC/Security wrapper
           - ImageStream = An abstraction of a Docker image that triggers builds/deploys when tags change

        5. **Tone:**
           - Confident, enterprise-focused, slightly cautious about security
           - Always mention "Day 2 Operations" (logging, monitoring) when proposing an architecture
           - Break complex topics into digestible chunks`,
        temperature: 0.7,
        // Additional safety settings
        safetySettings: [
          {
            category: 'HARM_CATEGORY_HARASSMENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_HATE_SPEECH',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          },
          {
            category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
            threshold: 'BLOCK_MEDIUM_AND_ABOVE'
          }
        ]
      },
    });
    
    // Validate response before returning
    if (!response || !response.text) {
      return "Error: Invalid response from AI service.";
    }
    
    return response.text;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    console.error("Error details:", error.message, error.response?.data);
    
    // Return more specific error message
    if (error.message?.includes("API key")) {
      return "API Key error: Please check that your Gemini API key is valid and active.";
    }
    return `Error: ${error.message || "I am currently processing high traffic in the cluster. Please try again shortly."}`;
  }
};
