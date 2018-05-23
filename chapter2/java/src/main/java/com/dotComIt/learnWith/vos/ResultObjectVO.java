package com.dotComIt.learnWith.vos;
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class ResultObjectVO {

    private boolean error;
    public boolean isError() {
        return error;
    }

    public void setError(boolean error) {
        this.error = error;
    }

    private Object resultObject;
    public Object getResultObject() {
        return resultObject;
    }

    public void setResultObject(Object resultObject) {
        this.resultObject = resultObject;
    }
}
