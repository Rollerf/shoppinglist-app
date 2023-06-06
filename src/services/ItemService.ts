import Item from "../models/Item";
import { authHeader, authHeaderWithContentType } from "./AuthHeader";
import {REACT_APP_API_URL} from "@env";

const API_URL_ITEMS = REACT_APP_API_URL + '//items';

class ItemService {
    async getItems(): Promise<Item[]> {
        console.debug("getItems");
        const header = await authHeader();

        return await fetch(API_URL_ITEMS, { headers: header }).then(response => {
            if (response.ok) {
                return response.json();
            }

            throw new Error("getItems error: " + response.statusText);
        }).catch(error => {
            console.error("getItems error: " + error);
        });
    }

    async createItem(item: Item) {
        console.debug("createItem");

        return await fetch(API_URL_ITEMS, {
            method: 'POST',
            headers: await authHeaderWithContentType(),
            body: JSON.stringify(item)
        }).then(response => {
            if (response.ok) {
                console.debug("createItem success");

                return;
            }

            console.error("createItem error: " + response.statusText);
        }).catch(error => {
            console.error("createItem error: " + error);
        });
    }

    async modifyItem(item: Item) {
        return await fetch(API_URL_ITEMS, {
            method: 'PATCH',
            headers: await authHeaderWithContentType(),
            body: JSON.stringify(item)
        });
    }

    async deleteItem(item: Item) {
        item.deleted = true;
        return await fetch(API_URL_ITEMS, {
            method: 'PATCH',
            headers: await authHeaderWithContentType(),
            body: JSON.stringify(item)
        });
    }
}

export default new ItemService;