import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { GET } from "../helpers/fetch";
import { URL_LIST } from "../helpers/config";

import Content from "../components/reusable/content";

function Main() {
    const [categories, setCategories] = useState(false);

    useEffect(() => {
        GET({ url: URL_LIST.base + URL_LIST.categories }).then((response) => {
            let acc = {
                categoria: [],
                id: [],
                obj: []
            };

            // eslint-disable-next-line
            response.result.map(x => {
                if(acc.categoria.indexOf(x.categoria) === -1) {
                    acc.categoria.push(x.categoria);
                    acc.id.push(x.id);
                }
            });

            for(let i = 0; i < acc.categoria.length; i++) {
                acc.obj.push({
                    categoria: acc.categoria[i],
                    id: acc.id[i]
                })
            }

            setCategories(acc.obj);
        });
    }, []);

    return (
        <Content>
            <div className="category-holder">
                <h3 className="category-holder__title">Escolha uma Categoria</h3>

                {categories &&
                    categories.map((category, index) => (
                        <Link
                            to={`/categories?c=${category.categoria}`}
                            className="category-holder__item"
                            key={`category-${index}`}
                        >
                            {category.categoria}
                        </Link>
                    ))}
            </div>
        </Content>
    );
}

export default Main;
