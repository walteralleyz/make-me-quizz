import Artist from "../images/avatar/artist.png";
import Batman from "../images/avatar/batman.png";
import Beard from "../images/avatar/beard.png";
import Claus from "../images/avatar/claus.png";
import Female from "../images/avatar/female.png";
import Male from "../images/avatar/male.png";
import Muslim from "../images/avatar/muslim.png";
import Professor from "../images/avatar/professor.png";
import Programmer from "../images/avatar/programmer.png";

export const URL_LIST = {
    base: "http://localhost:5000/api/v1",
    signin: "/user/signin",
    signup: "/user/signup",
    signout: "/user/signout",
    nick: "/user/nick/",
    categories: "/question/categories"
};

export const AVATAR_LIST = [
    {
        img: Artist,
        description: "artist",
    },

    {
        img: Batman,
        description: "batman",
    },

    {
        img: Beard,
        description: "beard",
    },

    {
        img: Claus,
        description: "claus",
    },

    {
        img: Female,
        description: "female",
    },

    {
        img: Male,
        description: "male",
    },

    {
        img: Muslim,
        description: "muslim",
    },

    {
        img: Professor,
        description: "professor",
    },

    {
        img: Programmer,
        description: "programmer",
    }
]