package com.Osom.demo.config;

import com.stripe.Stripe;
import com.stripe.exception.StripeException;
import com.stripe.model.PaymentIntent;
import com.stripe.param.PaymentIntentCreateParams;
import org.springframework.stereotype.Service;

@Service
public class StripeConfig {
    public static final String SECRET_KEY = "";

    public StripeConfig(){
       Stripe.apiKey = SECRET_KEY;
   }

   public PaymentIntent createPaymentIntent(double amount , String currency)throws StripeException {
       PaymentIntentCreateParams params = PaymentIntentCreateParams.builder().setAmount((long)amount).setCurrency(currency).build();
       return PaymentIntent.create(params);
   }
}
