import { InputBase } from "@material-ui/core";
import SearchIcon from "@material-ui/icons/Search";
import { Dropdown, Menu } from "antd";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAPI } from "../../../utils/FetchData";
import { IBlog } from "../../../utils/TypeScript";

const Search = (props: any) => {
    const [valueSearch, setValueSearch] = useState("");
    const [blogs, setBlogs] = useState<IBlog[]>([]);

    useEffect(() => {
        const delayDebounce = setTimeout(async () => {
            if (valueSearch.length < 2) return setBlogs([]);

            try {
                const res = await getAPI(`search/blogs?title=${valueSearch}`);
                setBlogs(res.data);
            } catch (err: any) {
                setBlogs([])
                console.log(err);
            }
        }, 400);

        return () => clearTimeout(delayDebounce);
    }, [valueSearch]);
    const menu = (
        <Menu>
            {valueSearch.length >= 2 && blogs.length ? (
                blogs.map((item) => (
                    <Menu.Item key={item._id}>
                        <Link to={`/blog/${item._id}`}>{item.title}</Link>
                    </Menu.Item>
                ))
            ) : (
                <Menu.Item key={5432342}>Nhập để tìm kiếm</Menu.Item>
            )}
        </Menu>
    );

    return (
        <Dropdown overlay={menu}>
            <div className={props.classes.search}>
                <div className={props.classes.searchIcon}>
                    <SearchIcon />
                </div>
                <InputBase
                    placeholder="Search…"
                    classes={{
                        root: props.classes.inputRoot,
                        input: props.classes.inputInput,
                    }}
                    value={valueSearch}
                    onChange={(item) => setValueSearch(item.target.value)}
                    inputProps={{ "aria-label": "search" }}
                />
            </div>
        </Dropdown>
    );
};

export default Search;
