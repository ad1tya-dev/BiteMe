// Mock email service - In production, you'd use services like SendGrid, Mailgun, or AWS SES
// For this demo, we'll simulate email sending

export const sendOrderConfirmationEmail = async (orderData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('📧 Order Confirmation Email Sent!');
      console.log('To:', orderData.userEmail);
      console.log('Order Details:', orderData);
      
      // Email template
      const emailTemplate = `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #ff4343 0%, #f22f2f 100%); 
                     color: white; padding: 30px; text-align: center; }
            .content { padding: 30px; background: #f9f9f9; }
            .order-item { padding: 15px; border-bottom: 1px solid #ddd; }
            .total { font-size: 24px; font-weight: bold; color: #ff4343; text-align: right; }
            .footer { text-align: center; padding: 20px; color: #888; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🍔 Order Confirmed!</h1>
              <p>Thank you for your order from Food Zone</p>
            </div>
            <div class="content">
              <h2>Order #${orderData.id || 'NEW'}</h2>
              <p>Your delicious food is being prepared!</p>
              
              <h3>Order Summary:</h3>
              ${orderData.items.map(item => `
                <div class="order-item">
                  <strong>${item.name}</strong> x ${item.quantity} - $${(item.price * item.quantity).toFixed(2)}
                </div>
              `).join('')}
              
              <div class="total">
                Total: $${orderData.total.toFixed(2)}
              </div>
              
              <p style="margin-top: 30px;">
                Estimated delivery time: <strong>30-45 minutes</strong>
              </p>
            </div>
            <div class="footer">
              <p>Food Zone - Delivering Happiness 🍕</p>
              <p>Questions? Contact us at support@foodzone.com</p>
            </div>
          </div>
        </body>
        </html>
      `;
      
      resolve({
        success: true,
        message: 'Email sent successfully',
        template: emailTemplate,
      });
    }, 1000);
  });
};

export const sendWelcomeEmail = async (userData) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('📧 Welcome Email Sent!');
      console.log('To:', userData.email);
      
      resolve({
        success: true,
        message: 'Welcome email sent successfully',
      });
    }, 500);
  });
};