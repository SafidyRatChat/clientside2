import React, { useEffect, useState } from "react";
import Logo from "../img/Logo.png";
import { FaSearch } from "react-icons/fa";
import { List } from "./list";
import { FaListUl } from "react-icons/fa";
import { doc, getFirestore, getDoc } from "firebase/firestore";

const Headbar = (props) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  //console.log(searchResult);
  const products = [];
  const handleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleSearch = async () => {
    const docRef = doc(getFirestore(), "Products", "rnzlPP0EXcsejuZLUe7B");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      // Convertir la chaîne de recherche en minuscules pour faciliter la comparaison
      const searchTerm = searchInput.toLowerCase();
      // Obtenir le tableau "List" de chaque document

      const list = docSnap.data().liste;

      // Itérer à travers chaque élément du tableau "List"
      list.forEach((item) => {
        // Comparer le label de chaque élément avec la chaîne de recherche
        const similarity = getSimilarity(item.label.toLowerCase(), searchTerm);

        if (similarity.totalScore >= 0.75) {
          //console.log("simmmmmmmmmmmm");
          // Ajouter l'élément au tableau de produits correspondants
          products.push({
            id: docSnap.id,
            label: item.label,
            prix: item.price,
            img: item.img,
            description: item.description
          });
        }
      });

      // Définir le tableau de résultats de recherche
      if (!products[0]) {
        // console.log("not_in_data")
        products.push("not_in_data");
      }
      setSearchResult(products);

      props.SetProduct(products);
      props.SetSelected("flex");
    }
  };

  // Fonction pour calculer la similarité de deux chaînes en pourcentage
  const getSimilarity = (str1, str2) => {
    const words1 = str1.split(" ");
    const len1 = words1.length;
    const len2 = str2.length;
    const maxLength = Math.max(len1, len2);

    let totalScore = 0;
    const scores = {};

    for (let i = 0; i < len1; i++) {
      const word = words1[i].toLowerCase();
      const score = getWordSimilarity(word, str2.toLowerCase());
      scores[word] = score;
      totalScore += score;
    }

    const avgScore = totalScore / len1;
    return { totalScore, scores };
  };

  const getWordSimilarity = (word, str) => {
    const len1 = word.length;
    const len2 = str.length;
    const maxLength = Math.max(len1, len2);

    let score = 0;
    for (let i = 0; i < maxLength; i++) {
      if (word[i] === str[i]) {
        score++;
      }
    }

    return score / maxLength;
  };

  return (
    <div className="headbar">
      <div className="logo">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="search-container">
        <input
          onChange={(event) => setSearchInput(event.target.value)}
          type="text"
          placeholder="Search..."
        />
        <button onClick={handleSearch} type="submit">
          <FaSearch />
        </button>
      </div>
      <div className="menu">
        <ul>
          <li onClick={handleDropdown}>
            <FaListUl style={{ cursor: "pointer" }} />
          </li>
          {showDropdown && (
            <div className="dropdown">
              <List />
            </div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Headbar;
