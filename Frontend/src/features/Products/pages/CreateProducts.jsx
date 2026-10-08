import { useState } from "react";
import { useProduct } from "../Hook/useProduct";


function CreateProducts() {
    const { handleCreateProduct} = useProduct();

    const [formData, setFormData] = useState({
        title: "",
        description: "",
        priceAmount: "",
        priceCurrency: "INR",
    });

    const [images, setImages] = useState([]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleImageChange = (e) => {
        setImages(e.target.files);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const data = new FormData();

        data.append("title", formData.title);
        data.append("description", formData.description);
        data.append("priceAmount", formData.priceAmount);
        data.append("priceCurrency", formData.priceCurrency);

        for (const image of images) {
            data.append("images", image);
        }

    console.log("FormData ready");

    const response = await handleCreateProduct(data);

    console.log("API response:", response);

        
        // console.log(data);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="title"
                placeholder="Product title"
                value={formData.title}
                onChange={handleChange}
            />

            <textarea
                name="description"
                placeholder="Product description"
                value={formData.description}
                onChange={handleChange}
            />

            <input
                type="number"
                name="priceAmount"
                placeholder="Price"
                value={formData.priceAmount}
                onChange={handleChange}
            />

            <select
                name="priceCurrency"
                value={formData.priceCurrency}
                onChange={handleChange}
            >
                <option value="INR">INR ₹</option>
                <option value="USD">USD $</option>
            </select>

            <input
                type="file"
                name="images"
                accept="image/*"
                multiple
                onChange={handleImageChange}
            />

            <button type="submit">
                Create Product
            </button>
        </form>
    );
}

export default CreateProducts;
