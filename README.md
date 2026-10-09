# ⚡ Pokémon Card Championship (TCG Battle Game)

A fast-paced, 10-round Pokémon card battle game built with Vanilla JavaScript, HTML5, CSS3 3D transforms, and Web Audio API synthesis. Inspired by modern Pokémon TCG cards, featuring realistic holographic card tilt physics, 2x Type Weakness damage, Quickness dodge mechanics, Mega Evolutions, and dynamic energy management!

![Game Preview](assets/pikachu.jpg)

## 🌟 Key Features

- **🎮 4 Starter Pokémon**:
  - ⚡ **Pikachu** (Electric • 20% Quickness Dodge) ➔ Evolves into **Raichu** ➔ **Mega Raichu GX**
  - ⭐ **Eevee** (Normal • 25% Quickness Dodge) ➔ Choice of 4 Stage 1 Eeveelutions (**Jolteon, Vaporeon, Flareon, Espeon**) ➔ **Mega Eeveelution VMAX**
  - 🔥 **Charizard** (Fire • 15% Quickness Dodge) ➔ **Mega Charizard X**
  - 🐉 **Dragonite** (Dragon • 15% Quickness Dodge) ➔ **Mega Dragonite VMAX**

- **🧬 Faint Evolutions & Mega Forms**:
  - **2 Faints**: Ascends into Stage 1 Form with higher HP and powered-up moves.
  - **4 Faints**: Triggers **Mega Evolution** with animated rainbow hologram frames, 360° 3D card spin animations, and massive damage moves!

- **💨 Quickness Dodge System**:
  - High-speed Pokémon have a native percentage chance to completely dodge incoming attacks (`DODGED! 💨`), avoiding all damage with high-speed motion blur effects and whoosh SFX.

- **🎯 Accurate Type Weaknesses (2x DMG)**:
  - Electric weak to Fighting/Ground, Normal weak to Fighting, Fire weak to Water, Water weak to Electric/Grass, Dragon weak to Ice, Psychic weak to Ghost/Dark.

- **⚡ Random Energy & Strategy**:
  - Energy attached each turn (0, 1, or 2 Energy).
  - **Pass Turn Button (⏭️)**: Allows passing turn when energy is low or to save energy for heavy moves.
  - **Comeback Energy Boost**: Fainted Pokémon gain +1 extra starting energy in subsequent rounds for every faint suffered!

- **🔊 Web Audio API Synthesizer**:
  - Built-in audio engine generating real-time electro zaps, hydro blasts, flame bursts, dodge whooshes, evolution chimes, and victory fanfares without external audio dependencies.

---

## 🚀 Getting Started

Simply open `index.html` in any web browser, or serve locally using Python:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080/` in your browser!

---

## 🛠️ Built With

- **HTML5** & **CSS3** (3D perspective transforms, Glassmorphism, CSS Custom Properties)
- **Vanilla JavaScript** (ES6+, Web Audio API, HTML5 Canvas particle renderer)
- **Google Fonts** (*Outfit* and *Press Start 2P*)
