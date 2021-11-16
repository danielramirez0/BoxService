from django.shortcuts import render
import stripe

# Set your secret key. Remember to switch to your live secret key in production.
# See your keys here: https://dashboard.stripe.com/apikeys
stripe.api_key = 'sk_test_51JwEWPApTah8qG5JQmsDxbKENCB8OeJv3hd7w2wVUXvq7ZizTScg2LAPDyar2WCVlObOZc9J5I3sQizpB1XmyVOg00viLRNfYM'

stripe.PaymentIntent.create(
  amount=1000,
  currency='usd',
  payment_method_types=['card'],
  receipt_email='jenny.rosen@example.com',
)