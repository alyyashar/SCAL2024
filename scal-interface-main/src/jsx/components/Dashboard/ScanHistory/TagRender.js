const TagRender = ({ value }) => {
    const newValue = parseInt(value.noOfVulns);

    return (
        <>
            {newValue == 0 ?
                <span className="badge badge-success">
                    Safe
                    <span className="ms-1 fa fa-check" />
                </span>

                :
                <>
                    {newValue > 0 && newValue <= 3 ?
                        <span className="badge badge-warning">
                            Informational
                            <span className="ms-1 fas fa-stream" />
                        </span>
                        :
                        <>
                            {newValue > 3 && newValue <= 8 ?
                                <span className="badge badge-default">
                                    Low
                                    <span className="ms-1 fa fa-redo" />
                                </span>
                                :
                                <>
                                    {newValue > 8 && newValue <= 15
                                        ?
                                        <span className="badge badge-primary">
                                            Medium
                                            <span className="ms-1 fa fa-redo" />
                                        </span>
                                        :
                                        <>
                                            {newValue > 15 && newValue <= 30
                                                ?
                                                <span className="badge badge-dark">
                                                    High
                                                    <span className="ms-1 fa fa-redo" />
                                                </span>
                                                :
                                                <>
                                                    {newValue > 30
                                                        ?

                                                        <span className="badge badge-danger">
                                                            Critical
                                                            <span className="ms-1 fa fa-ban" />
                                                        </span>
                                                        :
                                                        <></>
                                                    }
                                                </>
                                            }
                                        </>
                                    }
                                </>

                            }

                        </>

                    }

                </>

            }
        </>
    );
}

export default TagRender;