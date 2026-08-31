export interface NewsletterService {
  subscribe(email: string): Promise<{ success: boolean; message: string }>;
}

export function getNewsletterService(): NewsletterService {
  const apiKey = process.env.NEWSLETTER_API_KEY;
  const listId = process.env.NEWSLETTER_LIST_ID;

  if (!apiKey || !listId) {
    return {
      async subscribe() {
        return {
          success: false,
          message: "Newsletter service is not configured.",
        };
      },
    };
  }

  return createProviderService(apiKey, listId);
}

function createProviderService(apiKey: string, listId: string): NewsletterService {
  return {
    async subscribe(email) {
      try {
        const res = await fetch(`https://api.sendgrid.com/v3/marketing/contacts`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            list_ids: [listId],
            contacts: [{ email }],
          }),
        });

        if (!res.ok) {
          return { success: false, message: "Subscription failed." };
        }

        return { success: true, message: "Subscribed successfully." };
      } catch {
        return { success: false, message: "Subscription failed." };
      }
    },
  };
}
