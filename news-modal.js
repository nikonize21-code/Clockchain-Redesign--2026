/* ============================================================
   Clockchain — News & Media article modal
   Replicates the original site's in-page article reader.
   Article URLs can be added to the `external` field when known.
   ============================================================ */

(function () {
  'use strict';

  const ARTICLES = {
    'research-temporal-truth': {
      source: 'Clockchain Research',
      date: 'Feb 3, 2026',
      tag: 'Whitepaper',
      title: 'Cross-Knowledge Graph Assertion of Temporal Truth',
      external: null,
      body: `
        <p>Clockchain Research presents a formal framework for asserting the temporal validity
        of claims across disjoint knowledge graphs by anchoring assertions to a verifiable
        blockchain-based clock.</p>

        <h3>Abstract</h3>
        <p>In a world where data flows across hundreds of independent knowledge graphs —
        each with its own clock, provenance, and source of truth — a single shared
        notion of "when" becomes the missing primitive. This paper introduces
        <em>Cross-Knowledge Graph Assertion of Temporal Truth</em> (CKG-ATT), a protocol
        for issuing, recording, and verifying timestamp-bound claims that hold across
        graphs operated by mutually distrusting parties.</p>

        <h3>Contributions</h3>
        <ul>
          <li><strong>Temporal anchoring.</strong> Every assertion is bound to a Clockchain timestamp, producing a cross-graph commitment that is publicly auditable.</li>
          <li><strong>Cross-graph verification.</strong> A second graph can independently confirm the assertion's timing without trusting the originating graph.</li>
          <li><strong>Proof-of-Time consensus.</strong> A consensus extension that prevents back-dating, future-dating, and selective replay across graph boundaries.</li>
        </ul>

        <p>The full paper, including formal proofs and benchmark data from the Clockchain
        testnet, will be published as part of the Clockchain Research series.</p>
      `
    },

    'smart-contract-eth-polygon': {
      source: 'Clockchain',
      date: 'Jun 3, 2025',
      tag: 'Product update',
      title: 'Smart Contract Scheduling & Execution on Ethereum and Polygon',
      external: null,
      body: `
        <p>Clockchain is now able to schedule and execute smart contracts on Ethereum and
        Polygon — using verifiable blockchain time as the trigger.</p>

        <p>For the first time, developers can guarantee that a critical on-chain action
        will fire at a precise, globally consistent moment — independent of any
        centralized scheduler, off-chain cron job, or trusted relayer.</p>

        <h3>What's available today</h3>
        <ul>
          <li><strong>Scheduled execution.</strong> Pin a contract call to a future Clockchain timestamp; execution is guaranteed at or after that moment, with cryptographic proof of when.</li>
          <li><strong>Cross-chain triggers.</strong> A single Clockchain timestamp can drive actions on multiple destination chains in lockstep.</li>
          <li><strong>Audit trail.</strong> Every execution emits a verifiable record tying the on-chain effect back to the Clockchain Time Oracle.</li>
        </ul>

        <p>Ethereum and Polygon are the first two destinations. Additional chains are on
        the roadmap for the rest of 2025.</p>
      `
    },

    'blockzeit-testnet': {
      source: 'Blockzeit',
      date: 'Feb 24, 2026',
      tag: 'Featured coverage',
      title: 'Clockchain Launches Public Testnet — Here\u2019s What It Offers',
      external: null,
      body: `
        <p>Clockchain, the time-focused blockchain network, has launched its public testnet,
        delivering the world's first verifiable blockchain-based time oracle.</p>

        <blockquote>
          There is an obvious need for a secure and globally consistent blockchain clock.
          <cite>Ken Yamada, CEO, Clockchain Network</cite>
        </blockquote>

        <p>The oracle is based on Clockchain's patented technology, which combines a
        physical network of the world's most accurate atomic clocks with the integrity
        and immutability of the blockchain. The result is a highly accurate and secure
        timekeeping and timestamping solution, accessible for data logging and asset
        authentication.</p>

        <h3>Three foundational services are now available</h3>
        <ul>
          <li><strong>Timestamp API</strong> — Verify and timestamp data every second from any device, anywhere in the world.</li>
          <li><strong>Data Logging &amp; Authentication</strong> — Log and record timestamp data onto the Clockchain for future authentication.</li>
          <li><strong>Smart Contract Scheduling &amp; Execution</strong> — Schedule and execute critical operations on Ethereum and Polygon, with additional chains coming soon.</li>
        </ul>

        <p>Clockchain has support from the Department of Economic Affairs of the Canton
        of Neuchâtel, and has been approved by FINMA, the Swiss Financial Market
        Supervisory Authority, to raise capital through a blockchain token sale.</p>
      `
    },

    'mexc-testnet': {
      source: 'MEXC',
      date: 'Feb 24, 2026',
      tag: 'Exchange coverage',
      title: 'Clockchain Unveils Testnet for Verifiable Blockchain Time',
      external: null,
      body: `
        <p>MEXC reports on Clockchain's public testnet launch — the first blockchain-based
        time oracle to combine atomic-clock precision with on-chain verifiability.</p>

        <p>The testnet introduces a new primitive for Web3: a shared, tamper-evident clock
        that every contract, oracle, and application can rely on. Historical timestamp
        failures — including high-profile incidents in finance and crypto — have
        underscored the need for a secure, globally consistent blockchain clock.</p>

        <h3>What developers can build</h3>
        <ul>
          <li><strong>Verifiable timestamping</strong> for assets, documents, and on-chain events.</li>
          <li><strong>Scheduled smart contracts</strong> that fire at a precise, provable moment.</li>
          <li><strong>Cross-chain time coordination</strong> across Ethereum, Polygon, and additional networks on the roadmap.</li>
        </ul>

        <p>The Clockchain testnet is fully operational and running smoothly. A global
        launch with a simultaneous token generation event is on the horizon.</p>
      `
    },

    'blockchainwire-testnet': {
      source: 'Blockchain Wire',
      date: 'Feb 24, 2026',
      tag: 'Press release',
      title: 'Clockchain Opens Public Testnet — A New Blockchain-Based Global Time Standard',
      external: null,
      body: `
        <p><strong>SAN FRANCISCO, CA — </strong>The Clockchain Network has completed
        development of the world's first blockchain-based time oracle and opened its
        public testnet to developers worldwide. The oracle generates time-data for both
        enterprise and the public, and is expected to play an important role in Web 3.0
        infrastructure development.</p>

        <blockquote>
          There is an obvious need for a secure and globally consistent blockchain clock —
          not only for the enhanced security it delivers, but also as a vital component of
          Web 3.0 infrastructure. The Clockchain Time Oracle sets new standards and raises
          the bar in this space.
          <cite>Ken Yamada, CEO, Clockchain Network</cite>
        </blockquote>

        <h3>About Clockchain</h3>
        <p>Clockchain is a blockchain-based system that leverages the immutable nature of
        blockchain ledgers to timestamp and authenticate user data, providing robust
        protection against falsification and forgery. The Clockchain test network is
        operational, and a global launch with a simultaneous token generation event is
        on the horizon.</p>

        <h3>About D4D Sàrl</h3>
        <p>D4D Sàrl is a time-focused blockchain technology company registered in
        Neuchâtel, Switzerland. Its mission is to create new standards for accuracy and
        security in timekeeping and timestamping, integrating these innovations into
        Web 3.0 applications.</p>
      `
    }
  };

  let lastFocus = null;

  function open(key) {
    const data = ARTICLES[key];
    if (!data) return;

    const modal = document.getElementById('articleModal');
    if (!modal) return;

    document.getElementById('ammSource').textContent = data.source;
    document.getElementById('ammDate').textContent = data.date;
    document.getElementById('ammTag').textContent = data.tag;
    document.getElementById('articleModalTitle').textContent = data.title;
    document.getElementById('articleModalContent').innerHTML = data.body;

    const ext = document.getElementById('ammExternal');
    if (data.external) {
      ext.href = data.external;
      ext.hidden = false;
    } else {
      ext.hidden = true;
    }

    lastFocus = document.activeElement;
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');

    // scroll modal to top
    requestAnimationFrame(() => {
      modal.scrollTop = 0;
      const closeBtn = modal.querySelector('.article-modal-close');
      if (closeBtn) closeBtn.focus();
    });
  }

  function close() {
    const modal = document.getElementById('articleModal');
    if (!modal) return;
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }

  function init() {
    // Click on any press-card opens its article
    document.querySelectorAll('.press-card[data-article]').forEach((card) => {
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      const key = card.getAttribute('data-article');
      const title = card.querySelector('h4')?.textContent || 'Read article';
      card.setAttribute('aria-label', title);

      card.addEventListener('click', () => open(key));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          open(key);
        }
      });
    });

    // Close handlers
    document.querySelectorAll('#articleModal [data-close]').forEach((el) => {
      el.addEventListener('click', close);
    });

    // Esc key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        const modal = document.getElementById('articleModal');
        if (modal && modal.classList.contains('open')) close();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // expose for later (e.g. to inject real URLs)
  window.ClockchainNews = { open, close, ARTICLES };
})();
