var http = require('http');
var server = new http.Server;



window.addEventListener('load', () => {
  root.render(
    //<React.StrictMode>
      <App />
    //</React.StrictMode>
  );
});

if (typeof window !== 'undefined') {
  console.log('You are on the browser');
} else {
  console.log('You are on the server');
  window.onload = async () => {
    if (!window.keplr) {
        alert("Please install keplr extension");
    } else {
          const chainId = "cosmoshub-4";

          // Enabling before using the Keplr is recommended.
          // This method will ask the user whether to allow access if they haven't visited this website.
          // Also, it will request that the user unlock the wallet if the wallet is locked.
          await window.keplr.enable(chainId);
      
          const offlineSigner = window.keplr.getOfflineSigner(chainId);
      
          // You can get the address/public keys by `getAccounts` method.
          // It can return the array of address/public key.
          // But, currently, Keplr extension manages only one address/public key pair.
          // XXX: This line is needed to set the sender address for SigningCosmosClient.
          const accounts = await offlineSigner.getAccounts();
      
          // Initialize the gaia api with the offline signer that is injected by Keplr extension.
          const cosmJS = new SigningCosmosClient(
              "https://lcd-cosmoshub.keplr.app",
              accounts[0].address,
              offlineSigner,
          );
      }
  }

}






server.listen(3333, '0.0.0.0');
var counter = 0
server.on('request', function (req, res){
        res.end('Hello from Server!' + ++counter);
});
