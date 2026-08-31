export interface AppointmentRequest {
  name: string;
  email: string;
  phone?: string;
  store: string;
  service: string;
  message?: string;
}

export interface AppointmentService {
  submit(request: AppointmentRequest): Promise<{
    success: boolean;
    reference?: string;
    message: string;
  }>;
}

export function getAppointmentService(): AppointmentService {
  const apiKey = process.env.APPOINTMENT_API_KEY;

  if (!apiKey) {
    return {
      async submit() {
        return {
          success: false,
          message: "Appointment service is not configured.",
        };
      },
    };
  }

  return createProviderService(apiKey);
}

function createProviderService(apiKey: string): AppointmentService {
  return {
    async submit(request) {
      try {
        const res = await fetch("https://api.uclothia.com/appointments", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        });

        if (!res.ok) {
          return { success: false, message: "Request failed." };
        }

        const data = await res.json();
        return {
          success: true,
          reference: data.reference,
          message: "Request received.",
        };
      } catch {
        return { success: false, message: "Request failed." };
      }
    },
  };
}
