<script>
  import Navbar from "$lib/components/Navbar.svelte";

  let disclaimerText = `
    You are solely responsible for your own NFTs and the risks associated with lending or borrowing them on this platform.
    You acknowledge that this platform is not a financial institution, a broker, a dealer, or an investment advisor, and does not provide any financial, legal, tax, or investment advice.
    You understand that the platform does not guarantee the security, validity, or availability of any NFTs or loans, and that you may lose access to your NFTs or loans at any time due to technical issues, hacking, fraud, or other unforeseen events.
    You agree to indemnify and hold harmless the platform, its owners, operators, affiliates, and agents from any and all claims, damages, liabilities, losses, costs, and expenses arising from or related to your use of the platform or any NFTs or loans you lend or borrow on the platform.
    You agree to comply with all applicable laws and regulations in your jurisdiction, and to not use the platform for any illegal or unethical purposes.
    You acknowledge that the platform may change, suspend, or terminate its services at any time without prior notice or liability to you.
    You acknowledge that the platform may collect, store, and use your personal information and data in accordance with its privacy policy, which you have read and accepted.
  `;
</script>

<Navbar />
<div class="mx-40 text-lg flex justify-center items-center min-h-screen">
  <p>Please read and acknowledge the following disclaimer:</p>
  <ul class="text-white text-center">
    {@html `<li>${disclaimerText.replace(/\n/g, "</li><li>")}</li>`}
  </ul>
</div>
