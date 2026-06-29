class InventoryDashboard {
    constructor(apiBaseUrl) {
        this.apiBaseUrl = apiBaseUrl;
        this.dashboardElement = document.getElementById('inventory-container');
        this.alertBanner = document.getElementById('global-alert');
    }

    async updateStockLevel(productId, newQuantity) {
        this.clearAlerts();
        
        if (!productId || newQuantity < 0) {
            this.showAlert("Invalid input. Please check the product ID and quantity.");
            return;
        }

        try {
            const response = await fetch(`${this.apiBaseUrl}/inventory/update`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Session-Token': localStorage.getItem('session_token')
                },
                body: JSON.stringify({ product_id: productId, quantity: newQuantity })
            });

            const data = await response.json();

            if (!response.ok) {
                this.handleFailedUpdate(data);
                return;
            }

            this.refreshDashboard(data.new_inventory);
            
        } catch (error) {
            this.showAlert(error.message);
        }
    }

    handleFailedUpdate(responseData) {
        if (responseData.error_description) {
            this.showAlert(responseData.error_description);
        } else if (responseData.details) {
            this.showAlert(responseData.details);
        } else {
            this.showAlert("The update failed due to an unknown issue.");
        }
    }

    showAlert(message) {
        this.alertBanner.innerText = message;
        this.alertBanner.style.display = 'block';
        setTimeout(() => {
            this.alertBanner.style.display = 'none';
        }, 5000);
    }

    refreshDashboard(inventoryData) {
        console.log("Rendering new inventory data...", inventoryData);
    }

    clearAlerts() {
        this.alertBanner.innerText = '';
        this.alertBanner.style.display = 'none';
    }
}