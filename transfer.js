const TonWeb = require("tonweb");

// Single function to convert hex to Uint8Array
function hexToUint8Array(hexString) {
  if (hexString.length % 2 !== 0) {
    throw new Error('Invalid length hex.');
  }

  const uint8Array = new Uint8Array(hexString.length / 2);

  for (let i = 0; i < hexString.length; i += 2) {
    const byte = hexString.substr(i, 2);
    uint8Array[i / 2] = parseInt(byte, 16);
  }

  return uint8Array;
}

const hexString = 'seedfromsafepalwalletexample';
const result = hexToUint8Array(hexString);

(async () => {
  const { NftCollection, NftItem, NftMarketplace, NftSale } = TonWeb.token.nft;
  const tonweb = new TonWeb(new TonWeb.HttpProvider('https://toncenter.com/api/v2/jsonRPC'));

  const keyPair = TonWeb.utils.nacl.sign.keyPair.fromSeed(result);
  const WalletClass = tonweb.wallet.all["v3R2"];
  const wallet = new WalletClass(tonweb.provider, {
    publicKey: keyPair.publicKey,
    wc: 0
  });
  const nftAddress = new TonWeb.utils.Address("nft_address");
  const myAddress = new TonWeb.utils.Address("send_nft_to_this_address");
  const nftItem = new NftItem(tonweb.provider, {address: nftAddress});
  
  const seqno = (await wallet.methods.seqno().call()) || 0;
  console.log({seqno});

  await new Promise(resolve => setTimeout(resolve, 1000));

  const amount = TonWeb.utils.toNano(0.04);

  console.log(
    await wallet.methods.transfer({
      secretKey: keyPair.secretKey,
      toAddress: await nftAddress,
      amount: amount,
      seqno: seqno,
      payload: await nftItem.createTransferBody({
        newOwnerAddress: myAddress,
        forwardAmount: TonWeb.utils.toNano(0.02),
        responseAddress: myAddress
      }),
      sendMode: 3,
    }).send().catch(e => console.log(e))
  );
})();
