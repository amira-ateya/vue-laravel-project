<template>
    <div>
      <button @click="pay">Pay Now</button>
    </div>
  </template>
  
  <script>
  export default {
    methods: {
      async pay() {
        const response = await fetch('/api/create-stripe-session', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            employer_id: 1,
            job_id: 2,
            amount: 19.99,
            success_url: window.location.origin + '/payment-success',
            cancel_url: window.location.origin + '/payment-cancel',
          }),
        });
        const data = await response.json();
        const stripe = Stripe('YOUR_STRIPE_PUBLIC_KEY');
        stripe.redirectToCheckout({ sessionId: data.id });
      }
    }
  }
  </script>
  