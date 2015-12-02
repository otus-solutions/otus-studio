package br.org.studio.rest;

import com.google.gson.Gson;

public class Response {

    private Object data;
    private Object error;

    public Object getData() {
        return data;
    }

    public void setData(Object data) {
        this.data = data;
    }

    public void setError(Object error) {
        this.error = error;
    }

    public Object getError() {
        return error;
    }

    public String toJson() {
        Gson gson = new Gson();
        return gson.toJson(this);
    }
}
