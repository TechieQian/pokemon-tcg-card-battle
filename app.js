/* ==========================================================================
   POKÉMON CARD BATTLE - GAME ENGINE (MEGA EVOLUTIONS & QUICKNESS DODGE)
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  
  // Mega Evolution Definitions (Triggers at 4 Faints)
  const megaMap = {
    pikachu: {
      id: 'mega-raichu',
      name: 'Mega Raichu GX',
      stage: 'MEGA EVOLUTION',
      maxHp: 140,
      quickness: 0.30,
      type: 'electric',
      weaknesses: ['fighting', 'ground'],
      weaknessText: '🥊 ×2 (2x DMG)',
      art: 'assets/raichu.jpg',
      artDesc: 'MEGA GX Pokémon HT: 3\'05" WT: 75.0 lbs.',
      moves: [
        { name: 'Giga Shock', damage: 60, cost: 1, critChance: 0.3, type: 'electric' },
        { name: 'Thunderstorm', damage: 75, cost: 2, critChance: 0.4, type: 'electric' }
      ]
    },
    charizard: {
      id: 'mega-charizard',
      name: 'Mega Charizard X',
      stage: 'MEGA EVOLUTION',
      maxHp: 150,
      quickness: 0.25,
      type: 'fire',
      weaknesses: ['water', 'ground'],
      weaknessText: '💧 ×2 (2x DMG)',
      art: 'assets/mega_charizard.jpg',
      artDesc: 'MEGA X Flame Pokémon HT: 5\'07" WT: 243.6 lbs.',
      moves: [
        { name: 'Dragon Claw', damage: 65, cost: 1, critChance: 0.3, type: 'fire' },
        { name: 'Blast Burn', damage: 85, cost: 2, critChance: 0.4, type: 'fire' }
      ]
    },
    dragonite: {
      id: 'mega-dragonite',
      name: 'Mega Dragonite VMAX',
      stage: 'MEGA EVOLUTION',
      maxHp: 160,
      quickness: 0.25,
      type: 'dragon',
      weaknesses: ['ice', 'fairy'],
      weaknessText: '❄️ ×2 (2x DMG)',
      art: 'assets/mega_dragonite.jpg',
      artDesc: 'MEGA VMAX Dragon Pokémon HT: 7\'03" WT: 460.0 lbs.',
      moves: [
        { name: 'Hyper Beam', damage: 68, cost: 1, critChance: 0.3, type: 'dragon' },
        { name: 'Draco Meteor', damage: 90, cost: 2, critChance: 0.4, type: 'dragon' }
      ]
    },
    eevee: {
      id: 'mega-eevee',
      name: 'Mega Eeveelution VMAX',
      stage: 'MEGA EVOLUTION',
      maxHp: 145,
      quickness: 0.30,
      type: 'psychic',
      weaknesses: ['ghost', 'dark'],
      weaknessText: '👻 ×2 (2x DMG)',
      art: 'assets/espeon.jpg',
      artDesc: 'MEGA Evolution VMAX HT: 4\'00" WT: 88.0 lbs.',
      moves: [
        { name: 'Cosmic Ray', damage: 62, cost: 1, critChance: 0.3, type: 'psychic' },
        { name: 'Celestial Nova', damage: 80, cost: 2, critChance: 0.4, type: 'psychic' }
      ]
    }
  };

  // Eeveelutions Pool
  const eeveelutionsMap = {
    jolteon: {
      id: 'jolteon',
      name: 'Jolteon',
      stage: 'STAGE 1',
      maxHp: 95,
      quickness: 0.25,
      type: 'electric',
      weaknesses: ['fighting', 'ground'],
      weaknessText: '🥊 ×2 (2x DMG)',
      art: 'assets/jolteon.jpg',
      artDesc: 'NO. 135 Lightning Pokémon HT: 2\'07" WT: 54.0 lbs.',
      moves: [
        { name: 'Pin Missile', damage: 30, cost: 1, critChance: 0.25, type: 'electric' },
        { name: 'Thunder Fang', damage: 50, cost: 2, critChance: 0.35, type: 'electric' }
      ]
    },
    vaporeon: {
      id: 'vaporeon',
      name: 'Vaporeon',
      stage: 'STAGE 1',
      maxHp: 110,
      quickness: 0.20,
      type: 'water',
      weaknesses: ['electric', 'grass'],
      weaknessText: '⚡ ×2 (2x DMG)',
      art: 'assets/vaporeon.jpg',
      artDesc: 'NO. 134 Bubble Jet Pokémon HT: 3\'03" WT: 63.9 lbs.',
      moves: [
        { name: 'Water Gun', damage: 30, cost: 1, critChance: 0.2, type: 'water' },
        { name: 'Hydro Pump', damage: 48, cost: 2, critChance: 0.35, type: 'water' }
      ]
    },
    flareon: {
      id: 'flareon',
      name: 'Flareon',
      stage: 'STAGE 1',
      maxHp: 100,
      quickness: 0.20,
      type: 'fire',
      weaknesses: ['water', 'ground'],
      weaknessText: '💧 ×2 (2x DMG)',
      art: 'assets/flareon.jpg',
      artDesc: 'NO. 136 Flame Pokémon HT: 2\'11" WT: 55.1 lbs.',
      moves: [
        { name: 'Bite', damage: 30, cost: 1, critChance: 0.2, type: 'fire' },
        { name: 'Flamethrower', damage: 52, cost: 2, critChance: 0.35, type: 'fire' }
      ]
    },
    espeon: {
      id: 'espeon',
      name: 'Espeon',
      stage: 'STAGE 1',
      maxHp: 95,
      quickness: 0.20,
      type: 'psychic',
      weaknesses: ['ghost', 'dark'],
      weaknessText: '👻 ×2 (2x DMG)',
      art: 'assets/espeon.jpg',
      artDesc: 'NO. 196 Sun Pokémon HT: 2\'11" WT: 58.4 lbs.',
      moves: [
        { name: 'Psybeam', damage: 32, cost: 1, critChance: 0.25, type: 'psychic' },
        { name: 'Psychic', damage: 50, cost: 2, critChance: 0.35, type: 'psychic' }
      ]
    }
  };

  // Raichu Stage 1 Definition
  const raichuData = {
    id: 'raichu',
    name: 'Raichu',
    stage: 'STAGE 1',
    maxHp: 100,
    quickness: 0.25,
    type: 'electric',
    weaknesses: ['fighting', 'ground'],
    weaknessText: '🥊 ×2 (2x DMG)',
    art: 'assets/raichu.jpg',
    artDesc: 'NO. 026 Mouse Pokémon HT: 2\'07" WT: 66.1 lbs.',
    moves: [
      { name: 'Thunderbolt', damage: 35, cost: 1, critChance: 0.25, type: 'electric' },
      { name: 'Thunder', damage: 55, cost: 2, critChance: 0.35, type: 'electric' }
    ]
  };

  // Base Pokémon Starters
  const pokemonDatabase = {
    pikachu: {
      id: 'pikachu',
      name: 'Pikachu',
      stage: 'BASIC',
      hp: 60,
      maxHp: 60,
      quickness: 0.20,
      type: 'electric',
      weaknesses: ['fighting', 'ground'],
      weaknessText: '🥊 ×2 (2x DMG)',
      art: 'assets/pikachu.jpg',
      artDesc: 'NO. 025 Mouse Pokémon HT: 1\'04" WT: 13.2 lbs.',
      moves: [
        { name: 'Thunder Shock', damage: 15, cost: 1, critChance: 0.2, type: 'electric' },
        { name: 'Volt Tackle', damage: 30, cost: 2, critChance: 0.35, type: 'electric' }
      ]
    },
    eevee: {
      id: 'eevee',
      name: 'Eevee',
      stage: 'BASIC',
      hp: 60,
      maxHp: 60,
      quickness: 0.25,
      type: 'normal',
      weaknesses: ['fighting'],
      weaknessText: '🥊 ×2 (2x DMG)',
      art: 'assets/eevee.jpg',
      artDesc: 'NO. 133 Evolution Pokémon HT: 1\'00" WT: 14.3 lbs.',
      moves: [
        { name: 'Quick Attack', damage: 15, cost: 1, critChance: 0.2, type: 'normal' },
        { name: 'Swift', damage: 25, cost: 2, critChance: 0.35, type: 'normal' }
      ]
    },
    charizard: {
      id: 'charizard',
      name: 'Charizard',
      stage: 'STAGE 2',
      hp: 100,
      maxHp: 100,
      quickness: 0.15,
      type: 'fire',
      weaknesses: ['water', 'electric'],
      weaknessText: '💧 ×2 (2x DMG)',
      art: 'assets/charizard.jpg',
      artDesc: 'NO. 006 Flame Pokémon HT: 5\'07" WT: 199.5 lbs.',
      moves: [
        { name: 'Wing Attack', damage: 25, cost: 1, critChance: 0.2, type: 'fire' },
        { name: 'Fire Blast', damage: 45, cost: 2, critChance: 0.35, type: 'fire' }
      ]
    },
    dragonite: {
      id: 'dragonite',
      name: 'Dragonite',
      stage: 'STAGE 2',
      hp: 110,
      maxHp: 110,
      quickness: 0.15,
      type: 'dragon',
      weaknesses: ['ice', 'fairy'],
      weaknessText: '❄️ ×2 (2x DMG)',
      art: 'assets/dragonite.jpg',
      artDesc: 'NO. 149 Dragon Pokémon HT: 7\'03" WT: 463.0 lbs.',
      moves: [
        { name: 'Dragon Rush', damage: 30, cost: 1, critChance: 0.2, type: 'dragon' },
        { name: 'Outrage', damage: 50, cost: 2, critChance: 0.35, type: 'dragon' }
      ]
    }
  };

  // Active Game State
  const gameState = {
    playerPokemon: 'pikachu',
    cpuPokemon: 'eevee',
    pikachu: { ...pokemonDatabase.pikachu },
    eevee: { ...pokemonDatabase.eevee },
    energy: { pikachu: 1, eevee: 1 },
    maxEnergy: 4,
    faintCount: { pikachu: 0, eevee: 0 },
    isEvolved: { pikachu: false, eevee: false },
    isMegaEvolved: { pikachu: false, eevee: false },
    scores: { pikachu: 0, eevee: 0 },
    currentRound: 1,
    maxRounds: 10,
    isAnimating: false,
    aiEnabled: true,
    audioEnabled: true,
    tournamentOver: false
  };

  // DOM Elements
  const selectionModal = document.getElementById('selection-modal');
  const eeveelutionModal = document.getElementById('eeveelution-modal');
  const selectPikachuBtn = document.getElementById('select-pikachu-btn');
  const selectEeveeBtn = document.getElementById('select-eevee-btn');
  const selectCharizardBtn = document.getElementById('select-charizard-btn');
  const selectDragoniteBtn = document.getElementById('select-dragonite-btn');
  const changeStarterBtn = document.getElementById('change-starter-btn');

  const cardPikachu = document.getElementById('card-pikachu');
  const cardEevee = document.getElementById('card-eevee');
  const roleBadgePikachu = document.getElementById('role-badge-pikachu');
  const roleBadgeEevee = document.getElementById('role-badge-eevee');
  const hpBarPikachu = document.getElementById('hp-bar-pikachu');
  const hpBarEevee = document.getElementById('hp-bar-eevee');
  const hpTextPikachu = document.getElementById('hp-text-pikachu');
  const hpTextEevee = document.getElementById('hp-text-eevee');
  const scoreValPikachu = document.getElementById('score-val-pikachu');
  const scoreValEevee = document.getElementById('score-val-eevee');
  const scoreNamePikachu = document.getElementById('score-name-pikachu');
  const scoreNameEevee = document.getElementById('score-name-eevee');
  const roundCounterText = document.getElementById('round-counter-text');
  const faintBadgesPikachu = document.getElementById('faint-badges-pikachu');
  const faintBadgesEevee = document.getElementById('faint-badges-eevee');
  const energyOrbsPikachu = document.getElementById('energy-orbs-pikachu');
  const energyOrbsEevee = document.getElementById('energy-orbs-eevee');
  const quicknessBadgePikachu = document.getElementById('quickness-badge-pikachu');
  const quicknessBadgeEevee = document.getElementById('quickness-badge-eevee');
  const logBox = document.getElementById('log-box');
  const logRoundBadge = document.getElementById('log-round-badge');
  const turnText = document.getElementById('turn-text');
  const aiToggleBtn = document.getElementById('ai-toggle-btn');
  const aiStatusText = document.getElementById('ai-status-text');
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioStatusText = document.getElementById('audio-status-text');
  const restartRoundBtn = document.getElementById('restart-round-btn');
  const passTurnBtn = document.getElementById('pass-turn-btn');
  const resetBtn = document.getElementById('reset-btn');
  const victoryModal = document.getElementById('victory-modal');
  const modalCrown = document.getElementById('modal-crown');
  const winnerTitle = document.getElementById('winner-title');
  const winnerSubtitle = document.getElementById('winner-subtitle');
  const winnerPreviewContainer = document.getElementById('winner-preview-container');
  const rematchBtn = document.getElementById('rematch-btn');
  const rematchBtnText = document.getElementById('rematch-btn-text');
  const canvas = document.getElementById('fx-canvas');
  const ctx = canvas.getContext('2d');

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();

  /* --------------------------------------------------------------------------
     STARTER SELECTION LOGIC
     -------------------------------------------------------------------------- */
  function chooseStarter(chosenKey) {
    gameState.playerPokemon = 'pikachu'; // Player occupies Left Card Slot
    gameState.cpuPokemon = 'eevee';      // CPU occupies Right Card Slot

    // Options mapping: Pikachu, Eevee, Charizard, Dragonite
    const optionsPool = ['pikachu', 'eevee', 'charizard', 'dragonite'];
    const cpuOptions = optionsPool.filter(k => k !== chosenKey);
    const cpuChosenKey = cpuOptions[Math.floor(Math.random() * cpuOptions.length)];

    gameState.pikachu = { ...pokemonDatabase[chosenKey] };
    gameState.eevee = { ...pokemonDatabase[cpuChosenKey] };

    roleBadgePikachu.textContent = `YOU (${chosenKey.toUpperCase()})`;
    roleBadgePikachu.className = 'player-role-badge player-tag';
    roleBadgeEevee.textContent = `CPU (${cpuChosenKey.toUpperCase()})`;
    roleBadgeEevee.className = 'player-role-badge cpu-tag';

    selectionModal.classList.add('hidden');
    resetFullTournament();
  }

  selectPikachuBtn.addEventListener('click', () => chooseStarter('pikachu'));
  selectEeveeBtn.addEventListener('click', () => chooseStarter('eevee'));
  selectCharizardBtn.addEventListener('click', () => chooseStarter('charizard'));
  selectDragoniteBtn.addEventListener('click', () => chooseStarter('dragonite'));
  changeStarterBtn.addEventListener('click', () => selectionModal.classList.remove('hidden'));

  // Eeveelution Choice Modal Listener
  document.querySelectorAll('.eevee-option-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const chosenFormKey = btn.getAttribute('data-eeveelution');
      applyEeveelution('pikachu', chosenFormKey);
      eeveelutionModal.classList.add('hidden');
    });
  });

  /* --------------------------------------------------------------------------
     AUDIO SYNTHESIZER
     -------------------------------------------------------------------------- */
  let audioCtx = null;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
  }

  function playSound(type) {
    if (!gameState.audioEnabled) return;
    initAudio();
    if (!audioCtx) return;
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;

    if (type === 'electric') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(120, now);
      osc.frequency.exponentialRampToValueAtTime(800, now + 0.15);
      osc.frequency.exponentialRampToValueAtTime(100, now + 0.35);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.35);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'water') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(150, now + 0.3);

      gain.gain.setValueAtTime(0.35, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.3);
    } else if (type === 'fire') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(250, now);
      osc.frequency.linearRampToValueAtTime(80, now + 0.4);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'dragon' || type === 'psychic') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.4);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.4);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.4);
    } else if (type === 'dodge') {
      // Wind Whoosh Sound for Quickness Dodge
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(200, now + 0.2);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'normal') {
      [523.25, 659.25, 783.99, 1046.50].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);

        gain.gain.setValueAtTime(0.2, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.06 + 0.25);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.25);
      });
    } else if (type === 'energy') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(1760, now + 0.25);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.25);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } else if (type === 'error') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(110, now);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'impact') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(150, now);
      osc.frequency.exponentialRampToValueAtTime(30, now + 0.2);

      gain.gain.setValueAtTime(0.4, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } else if (type === 'weakness') {
      [300, 600, 1200].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);

        gain.gain.setValueAtTime(0.35, now + idx * 0.05);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.05 + 0.3);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.3);
      });
    } else if (type === 'evolution') {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51];
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.07);

        gain.gain.setValueAtTime(0.3, now + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.07 + 0.4);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.07);
        osc.stop(now + idx * 0.07 + 0.4);
      });
    } else if (type === 'faint') {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(60, now + 0.6);

      gain.gain.setValueAtTime(0.3, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.6);

      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start(now);
      osc.stop(now + 0.6);
    } else if (type === 'victory') {
      const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99];
      notes.forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.08);

        gain.gain.setValueAtTime(0.25, now + idx * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.01, now + idx * 0.08 + 0.35);

        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.08);
        osc.stop(now + idx * 0.08 + 0.35);
      });
    }
  }

  /* --------------------------------------------------------------------------
     3D TILT & PARTICLES
     -------------------------------------------------------------------------- */
  function setupCardTilt(card) {
    const sheen = card.querySelector('.holo-sheen');

    card.addEventListener('mousemove', (e) => {
      if (gameState.isAnimating || card.classList.contains('fainted')) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -14;
      const rotateY = ((x - centerX) / centerX) * 14;

      card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;

      if (sheen) {
        const percentX = (x / rect.width) * 100;
        const percentY = (y / rect.height) * 100;
        sheen.style.backgroundPosition = `${percentX}% ${percentY}%`;
        sheen.style.opacity = '0.85';
      }
    });

    card.addEventListener('mouseleave', () => {
      if (card.classList.contains('fainted')) return;
      card.style.transform = `rotateX(0deg) rotateY(0deg) scale(1)`;
      if (sheen) {
        sheen.style.opacity = '0.5';
      }
    });
  }

  setupCardTilt(cardPikachu);
  setupCardTilt(cardEevee);

  let particles = [];

  class Particle {
    constructor(x, y, color, size, vx, vy, life, shape = 'circle') {
      this.x = x;
      this.y = y;
      this.color = color;
      this.size = size;
      this.vx = vx;
      this.vy = vy;
      this.life = life;
      this.maxLife = life;
      this.shape = shape;
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.vy += 0.12;
      this.size *= 0.96;
      this.life--;
    }

    draw(ctx) {
      const alpha = Math.max(0, this.life / this.maxLife);
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = 10;

      if (this.shape === 'star') {
        drawStar(ctx, this.x, this.y, 5, this.size * 2, this.size);
      } else {
        ctx.beginPath();
        ctx.arc(this.x, this.y, Math.max(1, this.size), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  function createSparkBurst(x, y, color, shape = 'circle', count = 25) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      particles.push(new Particle(
        x, y,
        color,
        Math.random() * 6 + 3,
        Math.cos(angle) * speed,
        Math.sin(angle) * speed - 2,
        Math.random() * 30 + 20,
        shape
      ));
    }
  }

  function launchBeamFX(fromCardEl, toCardEl, color, shape = 'circle') {
    const fromRect = fromCardEl.getBoundingClientRect();
    const toRect = toCardEl.getBoundingClientRect();

    const startX = fromRect.left + fromRect.width / 2;
    const startY = fromRect.top + fromRect.height / 2;
    const endX = toRect.left + toRect.width / 2;
    const endY = toRect.top + toRect.height / 2;

    const dx = endX - startX;
    const dy = endY - startY;
    const steps = 15;

    for (let i = 0; i < steps; i++) {
      setTimeout(() => {
        const progress = i / steps;
        const px = startX + dx * progress;
        const py = startY + dy * progress;

        for (let p = 0; p < 4; p++) {
          particles.push(new Particle(
            px + (Math.random() - 0.5) * 20,
            py + (Math.random() - 0.5) * 20,
            color,
            Math.random() * 8 + 4,
            (Math.random() - 0.5) * 4,
            (Math.random() - 0.5) * 4,
            25,
            shape
          ));
        }
      }, i * 20);
    }
  }

  function renderFX() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      const p = particles[i];
      p.update();
      p.draw(ctx);
      if (p.life <= 0 || p.size < 0.5) {
        particles.splice(i, 1);
      }
    }
    requestAnimationFrame(renderFX);
  }
  renderFX();

  /* --------------------------------------------------------------------------
     LOG HELPER & RENDERERS
     -------------------------------------------------------------------------- */
  function addLogEntry(msg, className = '') {
    const p = document.createElement('p');
    p.className = `log-entry ${className}`;
    p.innerHTML = msg;
    logBox.appendChild(p);
    logBox.scrollTop = logBox.scrollHeight;
  }

  function addEnergy(pokemonKey, amount = 1) {
    if (gameState.energy[pokemonKey] < gameState.maxEnergy) {
      gameState.energy[pokemonKey] = Math.min(gameState.maxEnergy, gameState.energy[pokemonKey] + amount);
      renderEnergyOrbs(pokemonKey);
      renderMovesUI(pokemonKey);
    }
  }

  function rollTurnEnergy(pokemonKey) {
    const data = gameState[pokemonKey];
    const roll = Math.floor(Math.random() * 3); // 0, 1, or 2

    if (roll === 0) {
      addLogEntry(`⚠️ <strong>Unlucky!</strong> ${data.name} rolled <strong>0 Energy</strong> this turn!`, 'log-system');
    } else if (roll === 1) {
      addEnergy(pokemonKey, 1);
      playSound('energy');
      addLogEntry(`⚡ <strong>${data.name}</strong> gained <strong>+1 Energy</strong>!`, 'log-system');
    } else if (roll === 2) {
      addEnergy(pokemonKey, 2);
      playSound('energy');
      addLogEntry(`⚡⚡ <strong>Lucky!</strong> ${data.name} gained <strong>+2 Energy</strong>!`, 'log-system');
    }
  }

  function renderEnergyOrbs(pokemonKey) {
    const currentEnergy = gameState.energy[pokemonKey];
    const data = gameState[pokemonKey];
    const orbContainer = pokemonKey === 'pikachu' ? energyOrbsPikachu : energyOrbsEevee;

    orbContainer.innerHTML = '';
    const symbol = getTypeSymbol(data.type);

    for (let i = 0; i < gameState.maxEnergy; i++) {
      const orb = document.createElement('span');
      if (i < currentEnergy) {
        orb.className = `energy-orb ${data.type}-type-bg`;
        orb.textContent = symbol;
      } else {
        orb.className = 'energy-orb empty';
        orb.textContent = '';
      }
      orbContainer.appendChild(orb);
    }
  }

  function renderCardUI(pokemonKey) {
    const data = gameState[pokemonKey];
    const cardEl = pokemonKey === 'pikachu' ? cardPikachu : cardEevee;

    document.getElementById(`stage-tag-${pokemonKey}`).textContent = data.stage;
    document.getElementById(`name-display-${pokemonKey}`).textContent = data.name;
    document.getElementById(`score-name-${pokemonKey}`).textContent = data.name;

    document.getElementById(`art-img-${pokemonKey}`).src = data.art;
    document.getElementById(`art-desc-${pokemonKey}`).textContent = data.artDesc;

    document.getElementById(`weakness-${pokemonKey}`).textContent = data.weaknessText || '🥊 ×2 (2x DMG)';

    const quicknessBadgeEl = pokemonKey === 'pikachu' ? quicknessBadgePikachu : quicknessBadgeEevee;
    const dodgePct = Math.round((data.quickness || 0.2) * 100);
    quicknessBadgeEl.textContent = `💨 Dodge: ${dodgePct}%`;

    cardEl.className = `pokemon-card type-${data.type} ${gameState.isMegaEvolved[pokemonKey] ? 'is-mega-evolved' : gameState.isEvolved[pokemonKey] ? 'is-evolved' : ''}`;

    const typeIconEl = document.getElementById(`type-icon-${pokemonKey}`);
    typeIconEl.className = `type-icon ${data.type}-type-bg`;
    typeIconEl.textContent = getTypeSymbol(data.type);

    document.getElementById(`prompt-${pokemonKey}`).textContent = `${getTypeSymbol(data.type)} Click Card to Attack!`;

    renderEnergyOrbs(pokemonKey);
    renderMovesUI(pokemonKey);
    updateHPUI(pokemonKey);
    updateFaintBadges(pokemonKey);
  }

  function renderMovesUI(pokemonKey) {
    const data = gameState[pokemonKey];
    const currentEnergy = gameState.energy[pokemonKey];
    const movesContainer = document.getElementById(`moves-container-${pokemonKey}`);
    movesContainer.innerHTML = '';

    data.moves.forEach((move, idx) => {
      const hasEnoughEnergy = currentEnergy >= move.cost;
      const btn = document.createElement('button');
      btn.className = `move-btn ${idx === 1 ? 'move-heavy' : ''} ${hasEnoughEnergy ? '' : 'disabled'}`;
      btn.setAttribute('data-pokemon', pokemonKey);
      btn.setAttribute('data-move-index', idx);
      btn.title = hasEnoughEnergy ? `Click to use ${move.name}` : `Need ${move.cost} Energy!`;

      let energySymbols = '';
      for (let c = 0; c < move.cost; c++) {
        energySymbols += `<span class="energy-symbol ${move.type}">${getTypeSymbol(move.type)}</span>`;
      }

      const lockBadge = hasEnoughEnergy ? '' : `<span class="energy-required-badge">Need ${move.cost}⚡</span>`;

      btn.innerHTML = `
        <div class="energy-cost">${energySymbols}</div>
        <div class="move-details">
          <span class="move-name">${move.name} ${lockBadge}</span>
          <span class="move-desc">Cost: ${move.cost} Energy</span>
        </div>
        <span class="move-damage">${move.damage}</span>
      `;

      btn.addEventListener('click', (e) => {
        e.stopPropagation();

        if (pokemonKey !== gameState.playerPokemon) {
          playSound('error');
          addLogEntry(`⚠️ That's the CPU's card! Click your <strong>${gameState[gameState.playerPokemon].name}</strong> card to attack!`, 'log-system');
          return;
        }

        if (!hasEnoughEnergy) {
          playSound('error');
          const cardEl = pokemonKey === 'pikachu' ? cardPikachu : cardEevee;
          cardEl.classList.add('animate-hurt');
          setTimeout(() => cardEl.classList.remove('animate-hurt'), 300);
          turnText.textContent = `⚡ Need ${move.cost} Energy to use ${move.name}! (Current: ${currentEnergy})`;
          addLogEntry(`⚠️ Not enough energy for <strong>${move.name}</strong>! Need <strong>${move.cost}</strong> energy.`, 'log-system');
          return;
        }
        executeAttack(pokemonKey, idx);
      });

      movesContainer.appendChild(btn);
    });
  }

  function getTypeSymbol(type) {
    switch(type) {
      case 'electric': return '⚡';
      case 'water': return '💧';
      case 'fire': return '🔥';
      case 'psychic': return '🔮';
      case 'dragon': return '🐉';
      case 'normal': default: return '⭐';
    }
  }

  function updateFaintBadges(pokemonKey) {
    const faints = gameState.faintCount[pokemonKey];
    const isMega = gameState.isMegaEvolved[pokemonKey];
    const isEvolved = gameState.isEvolved[pokemonKey];
    const badgeEl = pokemonKey === 'pikachu' ? faintBadgesPikachu : faintBadgesEevee;

    if (isMega) {
      badgeEl.innerHTML = `🌟 MEGA EVOLVED FORM 🌟`;
    } else if (isEvolved) {
      const dots = faints === 2 ? '🔴 🔴 ⚪ ⚪' : '🔴 🔴 🔴 ⚪';
      badgeEl.innerHTML = `${dots} (${4 - faints} left to MEGA)`;
    } else {
      const dots = faints === 0 ? '⚪ ⚪ ⚪ ⚪' : '🔴 ⚪ ⚪ ⚪';
      badgeEl.innerHTML = `${dots} (${2 - faints} left to Evolve)`;
    }
  }

  /* --------------------------------------------------------------------------
     STAGE 1 & MEGA EVOLUTION ENGINE (AT 2 & 4 FAINTS)
     -------------------------------------------------------------------------- */
  function checkEvolution(pokemonKey) {
    const faints = gameState.faintCount[pokemonKey];

    // MEGA EVOLUTION AT 4 FAINTS!
    if (faints >= 4 && !gameState.isMegaEvolved[pokemonKey]) {
      applyMegaEvolution(pokemonKey);
    }
    // STAGE 1 EVOLUTION AT 2 FAINTS!
    else if (faints >= 2 && !gameState.isEvolved[pokemonKey]) {
      const currentData = gameState[pokemonKey];

      if (currentData.id === 'pikachu') {
        applyEeveelution(pokemonKey, 'raichuData');
      } else if (currentData.id === 'eevee') {
        if (pokemonKey === gameState.playerPokemon) {
          eeveelutionModal.classList.remove('hidden');
        } else {
          const options = ['jolteon', 'vaporeon', 'flareon', 'espeon'];
          const randomKey = options[Math.floor(Math.random() * options.length)];
          applyEeveelution(pokemonKey, randomKey);
        }
      } else if (currentData.id === 'charizard' || currentData.id === 'dragonite') {
        // Boosted Stage 1 form for Charizard/Dragonite
        applyEeveelution(pokemonKey, currentData.id);
      }
    }
  }

  function applyMegaEvolution(pokemonKey) {
    gameState.isMegaEvolved[pokemonKey] = true;
    const cardEl = pokemonKey === 'pikachu' ? cardPikachu : cardEevee;
    const currentData = gameState[pokemonKey];

    let megaData = null;
    if (currentData.id.includes('pikachu') || currentData.id.includes('raichu')) megaData = { ...megaMap.pikachu };
    else if (currentData.id.includes('charizard')) megaData = { ...megaMap.charizard };
    else if (currentData.id.includes('dragonite')) megaData = { ...megaMap.dragonite };
    else megaData = { ...megaMap.eevee };

    gameState[pokemonKey] = {
      ...megaData,
      hp: megaData.maxHp,
      maxHp: megaData.maxHp
    };
    gameState.energy[pokemonKey] = Math.min(gameState.maxEnergy, gameState.energy[pokemonKey] + 2);

    playSound('evolution');
    cardEl.classList.add('animate-evolve');

    const popup = document.createElement('div');
    popup.className = 'damage-popup evolve';
    popup.textContent = `🌟 MEGA EVOLUTION! 🌟`;
    cardEl.appendChild(popup);
    setTimeout(() => popup.remove(), 1400);

    const rect = cardEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    createSparkBurst(cx, cy, '#00f2fe', 'star', 90);
    createSparkBurst(cx, cy, '#ffde00', 'circle', 60);

    setTimeout(() => {
      cardEl.classList.remove('animate-evolve');
      renderCardUI(pokemonKey);
    }, 1200);

    addLogEntry(`🌟 <strong>MEGA EVOLUTION!</strong> ${currentData.name} fainted 4 times and <strong>MEGA EVOLVED INTO ${megaData.name.toUpperCase()}!</strong> (HP: ${megaData.maxHp}, Boosted Quickness: ${Math.round(megaData.quickness * 100)}%!)`, 'log-evolution');
  }

  function applyEeveelution(pokemonKey, formKey) {
    gameState.isEvolved[pokemonKey] = true;
    const cardEl = pokemonKey === 'pikachu' ? cardPikachu : cardEevee;
    const currentData = gameState[pokemonKey];

    let evolvedData = null;
    if (formKey === 'raichuData') evolvedData = { ...raichuData };
    else if (formKey === 'charizard') {
      evolvedData = { ...pokemonDatabase.charizard, name: 'Charizard STAGE 1', maxHp: 125, hp: 125, moves: [{ name: 'Fire Fang', damage: 38, cost: 1, type: 'fire' }, { name: 'Fire Blast', damage: 60, cost: 2, type: 'fire' }] };
    } else if (formKey === 'dragonite') {
      evolvedData = { ...pokemonDatabase.dragonite, name: 'Dragonite STAGE 1', maxHp: 130, hp: 130, moves: [{ name: 'Dragon Claw', damage: 40, cost: 1, type: 'dragon' }, { name: 'Outrage', damage: 65, cost: 2, type: 'dragon' }] };
    } else {
      evolvedData = { ...eeveelutionsMap[formKey] };
    }

    gameState[pokemonKey] = {
      ...evolvedData,
      hp: evolvedData.maxHp,
      maxHp: evolvedData.maxHp
    };
    gameState.energy[pokemonKey] = Math.min(gameState.maxEnergy, gameState.energy[pokemonKey] + 1);

    playSound('evolution');
    cardEl.classList.add('animate-evolve');

    const popup = document.createElement('div');
    popup.className = 'damage-popup evolve';
    popup.textContent = `✨ EVOLVING... ✨`;
    cardEl.appendChild(popup);
    setTimeout(() => popup.remove(), 1400);

    const rect = cardEl.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    createSparkBurst(cx, cy, '#ffd700', 'star', 80);
    createSparkBurst(cx, cy, '#ffffff', 'circle', 50);

    setTimeout(() => {
      cardEl.classList.remove('animate-evolve');
      renderCardUI(pokemonKey);
    }, 1200);

    addLogEntry(`✨ <strong>${currentData.name}</strong> evolved into <strong>${evolvedData.name.toUpperCase()}!</strong> (HP: ${evolvedData.maxHp})`, 'log-evolution');
  }

  /* --------------------------------------------------------------------------
     ATTACK EXECUTION SYSTEM WITH QUICKNESS DODGE & TYPE WEAKNESS 2X DMG
     -------------------------------------------------------------------------- */
  cardPikachu.addEventListener('click', () => {
    if (gameState.isAnimating || gameState.tournamentOver) return;
    if (gameState.playerPokemon !== 'pikachu') {
      playSound('error');
      addLogEntry(`⚠️ That's the CPU's card! Click your <strong>${gameState[gameState.playerPokemon].name}</strong> card to attack!`, 'log-system');
      return;
    }
    const affordableMoveIdx = getBestAffordableMove('pikachu');
    if (affordableMoveIdx !== null) {
      executeAttack('pikachu', affordableMoveIdx);
    } else {
      playSound('error');
      turnText.textContent = `⚡ Needs at least 1 Energy to attack!`;
    }
  });

  cardEevee.addEventListener('click', () => {
    if (gameState.isAnimating || gameState.tournamentOver) return;
    if (gameState.playerPokemon !== 'eevee') {
      playSound('error');
      addLogEntry(`⚠️ That's the CPU's card! Click your <strong>${gameState[gameState.playerPokemon].name}</strong> card to attack!`, 'log-system');
      return;
    }
    const affordableMoveIdx = getBestAffordableMove('eevee');
    if (affordableMoveIdx !== null) {
      executeAttack('eevee', affordableMoveIdx);
    } else {
      playSound('error');
      turnText.textContent = `⭐ Needs at least 1 Energy to attack!`;
    }
  });

  function getBestAffordableMove(pokemonKey) {
    const moves = gameState[pokemonKey].moves;
    const currentEnergy = gameState.energy[pokemonKey];

    if (moves[1] && currentEnergy >= moves[1].cost) return 1;
    if (moves[0] && currentEnergy >= moves[0].cost) return 0;
    return null;
  }

  function executeAttack(attackerKey, moveIndex) {
    if (gameState.isAnimating || gameState.tournamentOver) return;

    const defenderKey = attackerKey === 'pikachu' ? 'eevee' : 'pikachu';
    const attacker = gameState[attackerKey];
    const defender = gameState[defenderKey];
    const move = attacker.moves[moveIndex];

    if (gameState.energy[attackerKey] < move.cost) {
      playSound('error');
      turnText.textContent = `⚡ Need ${move.cost} Energy to use ${move.name}!`;
      return;
    }

    if (attacker.hp <= 0 || defender.hp <= 0) return;

    gameState.isAnimating = true;

    // Deduct energy
    gameState.energy[attackerKey] -= move.cost;
    renderEnergyOrbs(attackerKey);
    renderMovesUI(attackerKey);

    const attackerCard = attackerKey === 'pikachu' ? cardPikachu : cardEevee;
    const defenderCard = defenderKey === 'pikachu' ? cardPikachu : cardEevee;

    turnText.textContent = `${attacker.name} used ${move.name}! (-${move.cost} Energy)`;

    const moveAnimClass = getMoveAnimationClass(move.name, move.type, attackerKey);
    attackerCard.classList.add(moveAnimClass);
    playSound(move.type || attacker.type);

    const beamColor = move.type === 'electric' ? '#ffe600' :
                      move.type === 'water' ? '#74b9ff' :
                      move.type === 'fire' ? '#ff7675' :
                      move.type === 'psychic' ? '#a29bfe' :
                      move.type === 'dragon' ? '#f39c12' : '#ffffff';
    
    if (['Swift', 'Water Gun', 'Hydro Pump', 'Flamethrower', 'Fire Blast', 'Psybeam', 'Psychic', 'Hyper Beam', 'Draco Meteor', 'Thunderbolt', 'Thunder', 'Thunderstorm'].includes(move.name)) {
      launchBeamFX(attackerCard, defenderCard, beamColor, move.name === 'Swift' ? 'star' : 'circle');
    }

    setTimeout(() => {
      // QUICKNESS DODGE ROLL
      const isDodged = Math.random() < (defender.quickness || 0.2);

      if (isDodged) {
        // DEFENDER DODGES THE ATTACK!
        playSound('dodge');
        defenderCard.classList.add('anim-dodge-blur');

        showDamagePopup(defenderCard, 0, false, false, true);

        addLogEntry(`💨 <strong>${defender.name}</strong> used <strong>QUICKNESS</strong> and DODGED <strong>${attacker.name}'s ${move.name}</strong>! (0 DMG)!`, 'log-dodge');
        turnText.textContent = `💨 ${defender.name} DODGED the attack with Quickness!`;

        setTimeout(() => {
          attackerCard.classList.remove(moveAnimClass);
          defenderCard.classList.remove('anim-dodge-blur');
          gameState.isAnimating = false;

          // Switch turn & roll turn energy for defender
          rollTurnEnergy(defenderKey);

          if (gameState.aiEnabled && attackerKey === gameState.playerPokemon) {
            turnText.textContent = `${defender.name}'s turn to counter-attack!`;
            setTimeout(() => {
              if (!gameState.tournamentOver && defender.hp > 0) {
                const aiMoveIdx = getBestAffordableMove(gameState.cpuPokemon);
                if (aiMoveIdx !== null) {
                  executeAttack(gameState.cpuPokemon, aiMoveIdx);
                } else {
                  addLogEntry(`⏭️ <strong>CPU (${defender.name})</strong> has insufficient energy and passes turn!`, 'log-system');
                  turnText.textContent = `CPU passed turn back to you!`;
                  rollTurnEnergy(gameState.playerPokemon);
                }
              }
            }, 900);
          } else {
            const p1Key = gameState.playerPokemon;
            if (getBestAffordableMove(p1Key) === null) {
              turnText.textContent = `⚠️ Insufficient energy! Click 'Pass Turn ⏭️' to end turn.`;
            } else {
              turnText.textContent = `Your turn! Click a move to attack!`;
            }
          }
        }, 400);

        return;
      }

      // WEAKNESS & CRITICAL ROLL
      const isWeakness = defender.weaknesses && defender.weaknesses.includes(move.type);
      const isCrit = Math.random() < move.critChance;

      let multiplier = 1;
      if (isWeakness) multiplier *= 2;
      if (isCrit) multiplier *= 1.5;

      const damage = Math.round(move.damage * multiplier);

      defender.hp = Math.max(0, defender.hp - damage);

      playSound(isWeakness ? 'weakness' : 'impact');
      defenderCard.classList.add('animate-hurt');

      const targetRect = defenderCard.getBoundingClientRect();
      const targetX = targetRect.left + targetRect.width / 2;
      const targetY = targetRect.top + targetRect.height / 3;

      createSparkBurst(targetX, targetY, beamColor, isCrit || isWeakness ? 'star' : 'circle', isWeakness ? 45 : 30);

      showDamagePopup(defenderCard, damage, isCrit, isWeakness, false);
      updateHPUI(defenderKey);

      let statusExtraText = '';
      if (isWeakness && isCrit) statusExtraText = ' 💥 🎯 CRITICAL WEAKNESS HIT (3x DMG)!';
      else if (isWeakness) statusExtraText = ' 🎯 WEAKNESS! It\'s Super Effective (2x DMG)!';
      else if (isCrit) statusExtraText = ' 💥 CRITICAL HIT (1.5x DMG)!';

      const symbol = getTypeSymbol(move.type || attacker.type);
      addLogEntry(`${symbol} <strong>${attacker.name}</strong> used <strong>${move.name}</strong>! Dealt <strong>${damage} DMG</strong>.${statusExtraText}`, isWeakness ? 'log-weakness' : `log-${attackerKey}`);

      setTimeout(() => {
        attackerCard.classList.remove(moveAnimClass);
        defenderCard.classList.remove('animate-hurt');

        if (defender.hp <= 0) {
          handleRoundEnd(attackerKey, defenderKey, defenderCard);
        } else {
          gameState.isAnimating = false;

          // Switch turn & roll turn energy for defender
          rollTurnEnergy(defenderKey);

          if (gameState.aiEnabled && attackerKey === gameState.playerPokemon) {
            turnText.textContent = `${defender.name}'s turn to counter-attack!`;
            setTimeout(() => {
              if (!gameState.tournamentOver && defender.hp > 0) {
                const aiMoveIdx = getBestAffordableMove(gameState.cpuPokemon);
                if (aiMoveIdx !== null) {
                  executeAttack(gameState.cpuPokemon, aiMoveIdx);
                } else {
                  addLogEntry(`⏭️ <strong>CPU (${defender.name})</strong> has insufficient energy and passes turn!`, 'log-system');
                  turnText.textContent = `CPU passed turn back to you!`;
                  rollTurnEnergy(gameState.playerPokemon);
                }
              }
            }, 900);
          } else {
            const p1Key = gameState.playerPokemon;
            if (getBestAffordableMove(p1Key) === null) {
              turnText.textContent = `⚠️ Insufficient energy! Click 'Pass Turn ⏭️' to end turn.`;
            } else {
              turnText.textContent = `Your turn! Click a move to attack!`;
            }
          }
        }
      }, 350);

    }, 300);
  }

  function getMoveAnimationClass(moveName, moveType, attackerKey) {
    const isRight = attackerKey === 'pikachu';

    switch (moveName) {
      case 'Thunder Shock':
      case 'Thunderbolt':
      case 'Pin Missile':
      case 'Wing Attack':
        return 'anim-electric-spin';

      case 'Volt Tackle':
      case 'Thunder':
      case 'Thunder Fang':
      case 'Dragon Rush':
      case 'Dragon Claw':
        return isRight ? 'anim-warp-lunge-right' : 'anim-warp-lunge-left';

      case 'Quick Attack':
        return isRight ? 'anim-ghost-dash-right' : 'anim-ghost-dash-left';

      case 'Swift':
      case 'Draco Meteor':
        return 'anim-star-float';

      case 'Water Gun':
      case 'Hydro Pump':
      case 'Hyper Beam':
        return 'anim-hydro-vortex';

      case 'Bite':
      case 'Flamethrower':
      case 'Fire Blast':
      case 'Blast Burn':
        return 'anim-flame-ignition';

      case 'Psybeam':
      case 'Psychic':
      case 'Cosmic Ray':
        return 'anim-psychic-pulse';

      default:
        return isRight ? 'animate-lunge-right' : 'animate-lunge-left';
    }
  }

  function showDamagePopup(cardElement, damage, isCrit, isWeakness, isDodged) {
    const popup = document.createElement('div');
    let extraClass = '';
    if (isDodged) {
      extraClass = 'dodge';
      popup.textContent = `DODGED! 💨`;
    } else {
      if (isWeakness) extraClass = 'weakness';
      else if (isCrit) extraClass = 'critical';
      popup.textContent = `-${damage}${isWeakness ? ' (2x!)' : isCrit ? '!' : ''}`;
    }

    popup.className = `damage-popup ${extraClass}`;
    cardElement.appendChild(popup);

    setTimeout(() => { popup.remove(); }, 1000);
  }

  function updateHPUI(pokemonKey) {
    const data = gameState[pokemonKey];
    const hpBar = pokemonKey === 'pikachu' ? hpBarPikachu : hpBarEevee;
    const hpText = pokemonKey === 'pikachu' ? hpTextPikachu : hpTextEevee;

    const percentage = Math.max(0, (data.hp / data.maxHp) * 100);
    hpBar.style.width = `${percentage}%`;
    hpText.textContent = data.hp;

    if (percentage > 50) hpBar.style.backgroundColor = 'var(--hp-green)';
    else if (percentage > 20) hpBar.style.backgroundColor = 'var(--hp-yellow)';
    else hpBar.style.backgroundColor = 'var(--hp-red)';
  }

  /* --------------------------------------------------------------------------
     ROUND END & TOURNAMENT RESET
     -------------------------------------------------------------------------- */
  let roundAutoTimer = null;

  function handleRoundEnd(winnerKey, loserKey, loserCard) {
    gameState.isAnimating = false;

    gameState.scores[winnerKey]++;
    gameState.faintCount[loserKey]++;

    scoreValPikachu.textContent = gameState.scores.pikachu;
    scoreValEevee.textContent = gameState.scores.eevee;

    loserCard.classList.add('fainted');
    playSound('faint');

    const winner = gameState[winnerKey];
    const loser = gameState[loserKey];

    addLogEntry(`💀 <strong>${loser.name}</strong> fainted! 🏆 <strong>${winner.name}</strong> wins Round ${gameState.currentRound}!`, 'log-critical');

    checkEvolution(loserKey);

    setTimeout(() => {
      playSound('victory');

      if (gameState.currentRound >= gameState.maxRounds) {
        handleTournamentOver();
      } else {
        modalCrown.textContent = '👑';
        winnerTitle.textContent = `${winner.name.toUpperCase()} WINS ROUND ${gameState.currentRound}!`;
        winnerSubtitle.textContent = `${loser.name} fainted! Score: ${gameState.pikachu.name} ${gameState.scores.pikachu} - ${gameState.scores.eevee} ${gameState.eevee.name}`;

        let countdown = 2;
        rematchBtnText.textContent = `⚡ NEXT ROUND IN ${countdown}S ⚡`;
        winnerPreviewContainer.innerHTML = `
          <div style="font-size: 1.1rem; font-weight: bold; color: #ffde00;">
            Auto-advancing to Round ${gameState.currentRound + 1} of ${gameState.maxRounds}...
          </div>
        `;
        victoryModal.classList.remove('hidden');

        if (roundAutoTimer) clearInterval(roundAutoTimer);

        roundAutoTimer = setInterval(() => {
          countdown--;
          if (countdown > 0) {
            rematchBtnText.textContent = `⚡ NEXT ROUND IN ${countdown}S ⚡`;
          } else {
            clearInterval(roundAutoTimer);
            roundAutoTimer = null;
            if (eeveelutionModal.classList.contains('hidden')) {
              startNextRoundOrReset();
            }
          }
        }, 1000);
      }
    }, 700);
  }

  function handleTournamentOver() {
    gameState.tournamentOver = true;

    for (let i = 0; i < 120; i++) {
      particles.push(new Particle(
        window.innerWidth / 2 + (Math.random() - 0.5) * 600,
        window.innerHeight / 3,
        ['#ffde00', '#ff4757', '#2ed573', '#1e90ff', '#ffffff'][Math.floor(Math.random() * 5)],
        Math.random() * 8 + 4,
        (Math.random() - 0.5) * 16,
        Math.random() * -14 - 4,
        Math.random() * 90 + 40,
        'star'
      ));
    }

    const pScore = gameState.scores.pikachu;
    const eScore = gameState.scores.eevee;
    let champName = '';

    if (pScore > eScore) {
      champName = `${gameState.pikachu.name.toUpperCase()} IS THE CHAMPION!`;
    } else if (eScore > pScore) {
      champName = `${gameState.eevee.name.toUpperCase()} IS THE CHAMPION!`;
    } else {
      champName = `MATCH TIED ${pScore} - ${eScore}! DUAL CHAMPIONS!`;
    }

    modalCrown.textContent = '🏆';
    winnerTitle.textContent = champName;
    winnerSubtitle.textContent = `Final Score: ${gameState.pikachu.name} ${pScore} — ${eScore} ${gameState.eevee.name}`;

    winnerPreviewContainer.innerHTML = `
      <div style="background: rgba(255, 222, 0, 0.15); border: 2px solid #ffde00; padding: 1rem; border-radius: 12px;">
        <p style="font-size: 1.1rem; font-weight: bold; color: #ffde00;">🎉 10-Round Championship Complete! 🎉</p>
        <p style="font-size: 0.9rem; color: #cbd5e1; margin-top: 4px;">Thank you for playing this Pokémon TCG Battle!</p>
      </div>
    `;

    rematchBtnText.textContent = `🏆 START NEW TOURNAMENT 🏆`;
    victoryModal.classList.remove('hidden');
  }

  function handlePassTurn() {
    if (gameState.isAnimating || gameState.tournamentOver) return;

    const p1Key = gameState.playerPokemon;
    const cpuKey = gameState.cpuPokemon;

    gameState.isAnimating = true;
    addLogEntry(`⏭️ <strong>${gameState[p1Key].name}</strong> passed turn to CPU!`, 'log-system');
    turnText.textContent = `${gameState[p1Key].name} passed turn to CPU!`;

    setTimeout(() => {
      gameState.isAnimating = false;

      // Roll energy for CPU
      rollTurnEnergy(cpuKey);

      if (gameState.aiEnabled) {
        setTimeout(() => {
          if (!gameState.tournamentOver && gameState[cpuKey].hp > 0) {
            const aiMoveIdx = getBestAffordableMove(cpuKey);
            if (aiMoveIdx !== null) {
              executeAttack(cpuKey, aiMoveIdx);
            } else {
              addLogEntry(`⏭️ <strong>CPU (${gameState[cpuKey].name})</strong> has insufficient energy to attack and passes turn back!`, 'log-system');
              turnText.textContent = `CPU passed turn back to you!`;

              // Turn switches back to P1
              rollTurnEnergy(p1Key);
              if (getBestAffordableMove(p1Key) === null) {
                turnText.textContent = `⚠️ Insufficient energy! Click 'Pass Turn ⏭️' to end turn.`;
              } else {
                turnText.textContent = `Your turn! Click a move to attack!`;
              }
            }
          }
        }, 700);
      }
    }, 400);
  }

  function restartCurrentRound() {
    gameState.pikachu.hp = gameState.pikachu.maxHp;
    gameState.eevee.hp = gameState.eevee.maxHp;
    
    // Comeback Bonus: 1 + faints
    gameState.energy.pikachu = Math.min(gameState.maxEnergy, 1 + gameState.faintCount.pikachu);
    gameState.energy.eevee = Math.min(gameState.maxEnergy, 1 + gameState.faintCount.eevee);
    gameState.isAnimating = false;

    cardPikachu.classList.remove('fainted');
    cardEevee.classList.remove('fainted');
    cardPikachu.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    cardEevee.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';

    renderCardUI('pikachu');
    renderCardUI('eevee');

    addLogEntry(`🔄 Round ${gameState.currentRound} restarted! Energy & HP restored!`, 'log-system');
    turnText.textContent = `Round ${gameState.currentRound} restarted! Choose a move or click Pass Turn!`;

    victoryModal.classList.add('hidden');
  }

  function startNextRoundOrReset() {
    if (roundAutoTimer) {
      clearInterval(roundAutoTimer);
      roundAutoTimer = null;
    }

    if (gameState.tournamentOver || gameState.currentRound >= gameState.maxRounds) {
      victoryModal.classList.add('hidden');
      selectionModal.classList.remove('hidden');
    } else {
      gameState.currentRound++;
      roundCounterText.textContent = `${gameState.currentRound} / ${gameState.maxRounds}`;
      logRoundBadge.textContent = `ROUND ${gameState.currentRound} OF ${gameState.maxRounds}`;

      gameState.pikachu.hp = gameState.pikachu.maxHp;
      gameState.eevee.hp = gameState.eevee.maxHp;
      
      // Faint Comeback Bonus: +1 extra starting energy per faint!
      const p1Faints = gameState.faintCount.pikachu;
      const cpuFaints = gameState.faintCount.eevee;

      gameState.energy.pikachu = Math.min(gameState.maxEnergy, 1 + p1Faints);
      gameState.energy.eevee = Math.min(gameState.maxEnergy, 1 + cpuFaints);
      gameState.isAnimating = false;

      cardPikachu.classList.remove('fainted');
      cardEevee.classList.remove('fainted');
      cardPikachu.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      cardEevee.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';

      renderCardUI('pikachu');
      renderCardUI('eevee');

      addLogEntry(`🔔 <strong>Round ${gameState.currentRound}</strong> begins!`, 'log-system');

      if (p1Faints > 0) {
        addLogEntry(`🔥 <strong>Comeback Boost!</strong> ${gameState.pikachu.name} gets +${p1Faints} Bonus Energy from faints!`, 'log-system');
      }
      if (cpuFaints > 0) {
        addLogEntry(`🔥 <strong>Comeback Boost!</strong> CPU (${gameState.eevee.name}) gets +${cpuFaints} Bonus Energy from faints!`, 'log-system');
      }

      // Roll Turn Energy (0, 1, or 2)
      rollTurnEnergy('pikachu');
      rollTurnEnergy('eevee');

      const p1Key = gameState.playerPokemon;
      if (getBestAffordableMove(p1Key) === null) {
        turnText.textContent = `Round ${gameState.currentRound}: ⚠️ Insufficient energy! Click 'Pass Turn ⏭️' to end turn.`;
      } else {
        turnText.textContent = `Round ${gameState.currentRound}: Choose a move or card to attack!`;
      }

      victoryModal.classList.add('hidden');
    }
  }

  function resetFullTournament() {
    const p1Faint = gameState.faintCount.pikachu || 0;
    const cpuFaint = gameState.faintCount.eevee || 0;

    gameState.energy = {
      pikachu: Math.min(gameState.maxEnergy, 1 + p1Faint),
      eevee: Math.min(gameState.maxEnergy, 1 + cpuFaint)
    };
    gameState.faintCount = { pikachu: 0, eevee: 0 };
    gameState.isEvolved = { pikachu: false, eevee: false };
    gameState.isMegaEvolved = { pikachu: false, eevee: false };
    gameState.scores = { pikachu: 0, eevee: 0 };
    gameState.currentRound = 1;
    gameState.tournamentOver = false;
    gameState.isAnimating = false;

    scoreValPikachu.textContent = '0';
    scoreValEevee.textContent = '0';
    roundCounterText.textContent = `1 / 10`;
    logRoundBadge.textContent = `ROUND 1 OF 10`;

    cardPikachu.classList.remove('fainted', 'is-evolved', 'is-mega-evolved');
    cardEevee.classList.remove('fainted', 'is-evolved', 'is-mega-evolved');
    cardPikachu.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
    cardEevee.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';

    renderCardUI('pikachu');
    renderCardUI('eevee');

    logBox.innerHTML = '';
    const playerCardName = gameState.pikachu.name;
    addLogEntry(`🎮 New 10-Round Tournament Start! You selected <strong>${playerCardName}</strong>! Click your card to attack!`, 'log-system');

    // Initial Turn Energy roll
    rollTurnEnergy('pikachu');
    rollTurnEnergy('eevee');

    if (getBestAffordableMove('pikachu') === null) {
      turnText.textContent = `Your turn! ⚠️ 0 Energy available! Click 'Pass Turn ⏭️' to pass turn to CPU.`;
    } else {
      turnText.textContent = `Your turn! Click your ${playerCardName} card or move to attack!`;
    }

    victoryModal.classList.add('hidden');
    eeveelutionModal.classList.add('hidden');
  }

  // Show selection modal on startup
  selectionModal.classList.remove('hidden');

  /* --------------------------------------------------------------------------
     EVENT LISTENERS FOR CONTROLS
     -------------------------------------------------------------------------- */
  aiToggleBtn.addEventListener('click', () => {
    gameState.aiEnabled = !gameState.aiEnabled;
    aiStatusText.textContent = gameState.aiEnabled ? 'ON' : 'OFF';
    aiToggleBtn.classList.toggle('active', gameState.aiEnabled);
  });

  audioToggleBtn.addEventListener('click', () => {
    gameState.audioEnabled = !gameState.audioEnabled;
    audioStatusText.textContent = gameState.audioEnabled ? 'ON' : 'OFF';
    audioToggleBtn.classList.toggle('active', gameState.audioEnabled);
  });

  restartRoundBtn.addEventListener('click', restartCurrentRound);
  passTurnBtn.addEventListener('click', handlePassTurn);
  resetBtn.addEventListener('click', () => {
    victoryModal.classList.add('hidden');
    selectionModal.classList.remove('hidden');
  });

  rematchBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    startNextRoundOrReset();
  });

  victoryModal.addEventListener('click', (e) => {
    if (e.target === victoryModal) {
      startNextRoundOrReset();
    }
  });

});
