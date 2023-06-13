function rgbToHex(r, g, b) {
    const red = r.toString(16).padStart(2, '0');
    const green = g.toString(16).padStart(2, '0');
    const blue = b.toString(16).padStart(2, '0');
    return `#${red}${green}${blue}`;
  }


const colors = [
  { name: "Colorless", rgb: "255, 255, 255" },
  { name: "Darkness", rgb: "0, 0, 0" },
  { name: "Dragon", rgb: "120, 81, 169" },
  { name: "Fairy", rgb: "255, 192, 203" },
  { name: "Fighting", rgb: "255, 165, 0" },
  { name: "Fire", rgb: "255, 0, 0" },
  { name: "Grass", rgb: "0, 128, 0" },
  { name: "Lightning", rgb: "255, 255, 0" },
  { name: "Metal", rgb: "192, 192, 192" },
  { name: "Psychic", rgb: "128, 0, 128" },
  { name: "Water", rgb: "0, 0, 255" }
];

function deconstructColor(colorName) {
    const color = colors.find(obj => obj.name == colorName);
  
    if (color) {
      const [r, g, b] = color.rgb.split(", ").map(Number);
      return { r, g, b };
    }
  
    return null; // Color not found
  }

  function generateColor(r, g, b) {
    // Generate random values between -10 and -50 or 10 and 50
    var randomR = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 41) + 10);
    var randomG = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 41) + 10);
    var randomB = (Math.random() < 0.5 ? -1 : 1) * (Math.floor(Math.random() * 41) + 10);


    // Add the random values to the original RGB values
    var newR = r + randomR;
    var newG = g + randomG;
    var newB = b + randomB;
  
    // Ensure the values are within the valid range (0-255)
    newR = Math.min(Math.max(newR, 0), 255);
    newG = Math.min(Math.max(newG, 0), 255);
    newB = Math.min(Math.max(newB, 0), 255);
  
    const newColor = rgbToHex(newR, newG, newB)
    console.log(newColor)
  }


  const { r, g, b } = deconstructColor("Metal");

  generateColor(r,g,b)

  