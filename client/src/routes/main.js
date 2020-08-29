import React, { useState, useEffect } from "react";

import { GET } from "../helpers/fetch";
import { URL_LIST } from "../helpers/config";

import Content from "../components/reusable/content";

function Main() {
    const [categories, setCategories] = useState(false);

    useEffect(() => {
        GET({ url: URL_LIST.base + URL_LIST.categories }).then((response) =>
            setCategories(response.result)
        );
    }, []);

    return (
        <Content>
            <div className="category-holder">
                <h3 className="category-holder__title">Escolha uma Categoria</h3>

                {categories &&
                    categories.map((category, index) => (
                        <div
                            className="category-holder__item"
                            key={`category-${index}`}
                        >
                            {category.categoria}
                        </div>
                    ))}
            </div>
        </Content>
    );
}

export default Main;
