import React from "react";

import Button from "../../components/reusable/button";
import InputLabeled from "../../components/reusable/inputlabeled";

const FormQuestion = ({
    setCreate,
    setQuestionData,
    setEditable,
    questionData,
    handleQuestionSubmit,
    editable,
    create
}) => (
    <div style={{ display: create ? "block" : "none" }}>
        <span onClick={() => setCreate(!create)} className="form__edit--left">
            Dados Pessoais
        </span>

        <span onClick={() => setEditable(!editable)} className="form__edit">
            Editar
        </span>

        <InputLabeled
            label={"Pergunta"}
            id={"pergunta"}
            placeholder={"Escreva a pergunta"}
            value={questionData.pergunta}
            onChange={(e) =>
                setQuestionData({
                    ...questionData,
                    pergunta: e.currentTarget.value,
                })
            }
            disabled={!editable}
        />

        <InputLabeled
            label={"A"}
            id={"a"}
            placeholder={"Ex.: George Washington"}
            value={questionData.escolhas.a}
            onChange={(e) =>
                setQuestionData({
                    ...questionData,
                    escolhas: {
                        ...questionData.escolhas,
                        a: e.currentTarget.value,
                    },
                })
            }
            disabled={!editable}
        />

        <InputLabeled
            label={"B"}
            id={"b"}
            placeholder={"Ex.: George Washington"}
            value={questionData.escolhas.b}
            onChange={(e) =>
                setQuestionData({
                    ...questionData,
                    escolhas: {
                        ...questionData.escolhas,
                        b: e.currentTarget.value,
                    },
                })
            }
            disabled={!editable}
        />

        <InputLabeled
            label={"C"}
            id={"c"}
            placeholder={"Ex.: George Washington"}
            value={questionData.escolhas.c}
            onChange={(e) =>
                setQuestionData({
                    ...questionData,
                    escolhas: {
                        ...questionData.escolhas,
                        c: e.currentTarget.value,
                    },
                })
            }
            disabled={!editable}
        />

        <InputLabeled
            label={"D"}
            id={"d"}
            placeholder={"Ex.: George Washington"}
            value={questionData.escolhas.d}
            onChange={(e) =>
                setQuestionData({
                    ...questionData,
                    escolhas: {
                        ...questionData.escolhas,
                        d: e.currentTarget.value,
                    },
                })
            }
            disabled={!editable}
        />

        <InputLabeled
            label={"E"}
            id={"e"}
            placeholder={"Ex.: George Washington"}
            value={questionData.escolhas.e}
            onChange={(e) =>
                setQuestionData({
                    ...questionData,
                    escolhas: {
                        ...questionData.escolhas,
                        e: e.currentTarget.value,
                    },
                })
            }
            disabled={!editable}
        />

        <InputLabeled
            label={"Resposta"}
            id={"resposta"}
            placeholder={"Escreva a letra da resposta"}
            value={questionData.resposta}
            maxLength="1"
            onChange={(e) =>
                setQuestionData({
                    ...questionData,
                    resposta: e.currentTarget.value,
                })
            }
            disabled={!editable}
        />

        <InputLabeled
            label={"Categoria"}
            id={"categoria"}
            placeholder={"Ex.: Historia"}
            value={questionData.categoria}
            onChange={(e) =>
                setQuestionData({
                    ...questionData,
                    categoria: e.currentTarget.value,
                })
            }
            disabled={!editable}
        />

        <Button handleClick={handleQuestionSubmit} text={"Enviar"} disabled={!editable} />
    </div>
);

export default FormQuestion;
