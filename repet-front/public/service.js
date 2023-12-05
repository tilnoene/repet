// urlB64ToUint8Array is a magic function that will encode the base64 public key
// to Array buffer which is needed by the subscription option
const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');
  const rawData = atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

const saveSubscription = async subscription => {
  // const apiUrl = 'http://localhost:4001';
  const apiUrl = 'https://repet-notification.vercel.app';

  const SERVER_URL = `${apiUrl}/subscription`;

  const body = JSON.stringify({
    endpoint: subscription.endpoint,
    // expirationTime: null,
    p256dh: subscription.keys.p256dh,
    auth: subscription.keys.auth,
    user_id: 1,
  });

  const response = await fetch(SERVER_URL, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: body,
  });

  return response.json();
};

self.addEventListener('activate', async () => {
  // This will be called only once when the service worker is installed for first time.
  try {
    const applicationServerKey = urlB64ToUint8Array(
      'BJ5IxJBWdeqFDJTvrZ4wNRu7UY2XigDXjgiUBYEYVXDudxhEs0ReOJRBcBHsPYgZ5dyV8VjyqzbQKS8V7bUAglk',
    );
    const options = { applicationServerKey, userVisibleOnly: true };
    const subscription = await self.registration.pushManager.subscribe(options);

    // await saveSubscription(JSON.parse(JSON.stringify(subscription)));

    console.log('Notifications enabled.');
  } catch (err) {
    console.log('Error', err);
  }
});

self.addEventListener('push', function (event) {
  if (event.data) {
    console.log('Notificação recebida: ', event.data.text());
    showLocalNotification('rePET', event.data.text(), self.registration);
  } else {
    console.log('Push event but no data');
  }
});

const showLocalNotification = (title, body, swRegistration) => {
  const options = {
    body,
    icon: 'https://i.imgur.com/Sghb873.png',
  };
  swRegistration.showNotification(title, options);
};
