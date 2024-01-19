import React, { useEffect, useState } from "react";
import style from "./Styles/CreateBook.module.css";
import NavBar from "../components/NavBar";
import axios from "../utils/axiosConf";

export default function CreateBook() {
  //!Estados
  const [form, setForm] = useState({
    cover: "",
    title: "",
    author: "",
    gender: [],
    stars: 0,
    pages: 0,
    startDate: "",
    endDate: "",
    format: "",
    sinopsis: "",
    review: "",
    quotes: [],
  });
  const [id, setId] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [quoteList, setQuoteList] = useState([]);
  const [cover, setCover] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("idSession");
    setId(userId);
    console.log(userId);
  }, []);

  const handleChange = (event) => {
    event.preventDefault();
    const property = event.target.name;
    const value = event.target.value;
    setForm({ ...form, [property]: value });
  };

  //! Handle genres

  const handleGenreSelect = (e) => {
    const selectedGenre = e.target.value;

    setSelectedGenres((prevSelectedGenres) => [
      ...prevSelectedGenres,
      selectedGenre,
    ]);

    setForm({
      ...form,
      genres: "",
    });
  };

  const handleRemoveSelectedGenre = (removedGenre) => {
    const updatedSelectedGenres = selectedGenres.filter(
      (genre) => genre !== removedGenre
    );
    setSelectedGenres(updatedSelectedGenres);
  };

  //!Handle quotes
  const handleQuotesChange = (e) => {
    setForm({
      ...form,
      quotes: e.target.value,
    });
  };

  const handleQuoteKeyDown = (e) => {
    if (e.key === "Enter" && form.quotes.trim() !== "") {
      setQuoteList([...quoteList, form.quotes.trim()]);
      setForm({
        ...form,
        quotes: "",
      });
    }
  };

  const handleRemoveQuote = (removedQuote) => {
    const updatedQuoteList = quoteList.filter(
      (quote) => quote !== removedQuote
    );
    setQuoteList(updatedQuoteList);
  };
  //!Handle Stars
  const handleStarsChange = (increment) => {
    setForm((prevFormData) => ({
      ...prevFormData,
      stars: Math.max(0, Math.min(5, prevFormData.stars + increment)),
    }));
  };
  //!Handle formats
  const handleFormatChange = (event) => {
    const { value } = event.target;
    setForm((prevForm) => ({
      ...prevForm,
      format: value,
    }));
  };

  //! Handle cover

  const handleCoverChange = (e) => {
    const selectedFile = e.target.files[0];
    setCover(selectedFile);
  };

  //? Handle submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Start Date:", form.startDate);
    console.log("End Date:", form.endDate);

    const formSubmitData = new FormData();
    formSubmitData.append("cover", cover);
    formSubmitData.append("title", form.title);
    formSubmitData.append("author", form.author);
    formSubmitData.append("gender", selectedGenres);
    formSubmitData.append("stars", form.stars);
    formSubmitData.append("pages", form.pages);
    formSubmitData.append("startDate", form.startDate);
    formSubmitData.append("endDate", form.endDate);
    formSubmitData.append("format", form.format);
    formSubmitData.append("sinopsis", form.sinopsis);
    formSubmitData.append("review", form.review);
    formSubmitData.append("quotes", quoteList);
    formSubmitData.append("UserId", id);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      await axios.post("/book", formSubmitData, config);
      console.log("Request successful");
    } catch (error) {
      console.error("Error sending request", error);
      console.log(formSubmitData);
    }
  };

  const genres = [
    "None",
    "Fiction",
    "Non-fiction",
    "Mystery",
    "Science Fiction (Sci-Fi)",
    "Fantasy",
    "Romance",
    "Horror",
    "Thriller",
    "Historical Fiction",
    "Adventure",
    "Biography",
    "Autobiography",
    "Poetry",
    "Drama",
    "Comedy",
    "Satire",
    "Tragedy",
    "Memoir",
    "Self-help",
    "Science",
    "Other",
  ];

  const formats = ["Paper", "Audiobook", "Digital"];

  return (
    <div className={style.createBook}>
      <NavBar />
      <h2>Create a new book</h2>
      <div className={style.create}>
        <form className={style.form}>
          <div>
            <label htmlFor="cover">Cover (PNG or JPG)</label>
            <input type="file" name="cover" onChange={handleCoverChange} />
          </div>
          <div>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              name="title"
              onChange={handleChange}
              value={form.title}
            />
          </div>
          <div>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              name="author"
              onChange={handleChange}
              value={form.author}
            />
          </div>
          <div>
            <label htmlFor="stars">Stars</label>
            <div className={style.starsControl}>
              <button type="button" onClick={() => handleStarsChange(-1)}>
                -
              </button>
              <span>{form.stars}</span>
              <button type="button" onClick={() => handleStarsChange(1)}>
                +
              </button>
            </div>
          </div>
          <div>
            <label htmlFor="">Pages</label>
            <input
              name="pages"
              type="number"
              onChange={handleChange}
              value={form.pages}
            />
          </div>
          <div>
            <label htmlFor="">Start date</label>
            <input
              type="date"
              name="startDate"
              onChange={handleChange}
              value={form.startDate}
            />
          </div>
          <div>
            <label htmlFor="">End date</label>
            <input
              type="date"
              name="endDate"
              onChange={handleChange}
              value={form.endDate}
            />
          </div>

          <div>
            <label htmlFor="genres">Genres (press Enter to add)</label>
            <select
              name="genres"
              value={form.genres}
              onChange={handleGenreSelect}>
              <option value="" disabled>
                Select a genre
              </option>
              {genres?.map((genre, index) => (
                <option key={index} value={genre}>
                  {genre}
                </option>
              ))}
            </select>
            <div className={style.genreList}>
              {selectedGenres?.map((genre, index) => (
                <div key={index} className={style.genreItem}>
                  {genre}
                  <span onClick={() => handleRemoveSelectedGenre(genre)}>
                    &times;
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p>Format</p>
            <label htmlFor="format">Format</label>
            <select
              name="format"
              value={form.format}
              onChange={handleFormatChange}>
              <option value="" disabled>
                Select a format
              </option>
              {formats?.map((format, index) => (
                <option key={index} value={format}>
                  {format}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="">Sinopsis</label>
            <input
              type="text"
              name="sinopsis"
              onChange={handleChange}
              value={form.sinopsis}
            />
          </div>
          <div>
            <label htmlFor="">Review</label>
            <input
              type="text"
              name="review"
              onChange={handleChange}
              value={form.review}
            />
          </div>
          <div>
            <label htmlFor="quotes">Quotes (press Enter to add)</label>
            <input
              type="text"
              name="quotes"
              value={form.quotes}
              onChange={handleQuotesChange}
              onKeyDown={handleQuoteKeyDown}
            />
            <div className={style.quoteList}>
              {quoteList?.map((quote, index) => (
                <div key={index} className={style.quoteItem}>
                  {quote}
                  <span onClick={() => handleRemoveQuote(quote)}>&times;</span>
                </div>
              ))}
            </div>
          </div>
          <button type="submit" onClick={handleSubmit}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
