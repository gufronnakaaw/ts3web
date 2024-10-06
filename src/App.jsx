import { useEffect, useState } from 'react';

function App() {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    setInterval(() => {
      main();
    }, 500);

    async function main() {
      try {
        const response = await fetch('http://172.168.10.10:4000/teamspeak');
        const result = await response.json();

        setClients(result);
      } catch (error) {
        console.log(error);
        // alert('error saat mendapatkan data');
      }
    }
  }, []);

  return (
    <div className="p-4 flex gap-2">
      {clients.length
        ? clients.map((client, index) => {
            return (
              <div
                className={`p-5 border ${
                  client.is_talk
                    ? 'border-green-500 bg-green-500'
                    : 'border-gray-200 bg-white'
                } rounded-lg shadow `}
                key={index}
              >
                <h1
                  className={`font-bold ${
                    client.is_talk ? 'text-white' : 'text-gray-500'
                  }`}
                >
                  {client.nickname}
                </h1>
              </div>
            );
          })
        : null}
    </div>
  );
}

export default App;
