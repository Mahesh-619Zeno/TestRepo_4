const axios = require('axios');

class DocumentProcessor {
    constructor() {
        this.ocrServiceUrl = 'https://api.ocr-cloud.internal/v1/scan';
    }

    async processPdf(fileBuffer, config) {
        if (!fileBuffer || fileBuffer.length === 0) {
            return {
                success: false,
                reason: 'The uploaded file is empty or corrupted.'
            };
        }

        if (config.maxPages > 100) {
            return {
                success: false,
                reason: 'Page limit exceeded. Maximum allowed pages is 100.'
            };
        }

        try {
            const response = await axios.post(this.ocrServiceUrl, fileBuffer, {
                headers: { 'Content-Type': 'application/pdf' },
                timeout: 5000
            });

            return {
                success: true,
                extractedText: response.data.text
            };

        } catch (error) {
            if (error.response && error.response.status === 401) {
                return {
                    success: false,
                    reason: 'Service configuration error: Invalid OCR credentials.'
                };
            }
            if (error.code === 'ECONNABORTED') {
                return {
                    success: false,
                    reason: 'The OCR scanning service timed out. Please try again.'
                };
            }
            
            return {
                success: false,
                reason: error.message
            };
        }
    }
}

module.exports = DocumentProcessor;