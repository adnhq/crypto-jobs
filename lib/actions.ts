"use server";

import { stripe } from "./stripe";
import { supabase } from "./supabase";
import { JobData } from "./types";

export async function getPriceInEUR(amount: number) {
  // const res = await fetch(
  //   "https://v6.exchangerate-api.com/v6/9d1748d30854efc587853453/latest/USD"
  // );
  // const data = await res.json();

  // return amount * data.conversion_rates.EUR;
  return amount * 0.91;
}

export async function getPriceInGBP(amount: number) {
  // const res = await fetch(
  //   "https://v6.exchangerate-api.com/v6/9d1748d30854efc587853453/latest/USD"
  // );
  // const data = await res.json();

  // return amount * data.conversion_rates.GBP;
  return amount * 0.76;
}

export async function createJobPosting(newJob: any) {
  let amount;

  const comLogoName = `${Math.random()}-${newJob.companyLogo.name}`.replaceAll(
    "/",
    ""
  );

  const comLogoUrl = `${process.env.SUPABASE_URL}/storage/v1/object/public/companyLogo/${comLogoName}`;

  if (newJob.paymentCurrency === "eur") {
    amount = newJob.featured
      ? await getPriceInEUR(300)
      : await getPriceInEUR(200);
  } else if (newJob.paymentCurrency === "gbp") {
    amount = newJob.featured
      ? await getPriceInGBP(300)
      : await getPriceInGBP(200);
  } else {
    amount = newJob.featured ? 300 : 200;
  }

  // 1. Insert the new job into the database
  const { data, error } = await supabase
    .from("jobs")
    .insert([{ ...newJob, companyLogo: comLogoUrl, payableAmount: amount }])
    .select();
  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    throw new Error("Failed to create job posting");
  }

  const job = data[0] as JobData;
  const { id, paymentCurrency } = job;

  // 2. Create a Stripe PaymentIntent

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: paymentCurrency,
      metadata: {
        jobId: id,
      },
    });

    if (!paymentIntent.client_secret) {
      throw new Error("Stripe failed to create payment intent");
    }

    // 3. Update the job posting with the PaymentIntent ID
    const { data, error: updateError } = await supabase
      .from("jobs")
      .update({ paymentIntentId: paymentIntent.id })
      .eq("id", id)
      .select("*")
      .single();

    if (updateError) {
      throw updateError;
    }

    // 4. Upload the company logo
    const { error: uploadError } = await supabase.storage
      .from("companyLogo")
      .upload(
        comLogoName,
        Buffer.from(newJob.companyLogo.base64.split(",")[1], "base64"),
        {
          contentType: newJob.companyLogo.type,
        }
      );

    if (uploadError) throw uploadError;

    // 5. Return the client secret
    return {
      clientSecret: paymentIntent.client_secret,
      job: data as JobData,
    };
  } catch (stripeError) {
    // If Stripe fails, delete the job posting
    await supabase.from("jobs").delete().eq("id", id);
    throw stripeError;
  }
}

export async function getJobListings() {
  const { data, error } = await supabase.from("jobs").select("*");
  if (error) {
    throw error;
  }

  return data as JobData[];
}

export async function getJob(id: number) {
  const { data, error } = await supabase
    .from("jobs")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw error;
  }

  return data as JobData;
}
