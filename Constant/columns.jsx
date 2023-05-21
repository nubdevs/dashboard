import { Button } from "antd";

export const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
    },
    {
      title: "Sector",
      dataIndex: "sector",
      key: "sector",
    },
    {
      title: "Topic",
      dataIndex: "topic",
      key: "topic",
    },
    {
      title: "Relevance",
      dataIndex: "relevance",
      key: "relevance",
      sorter: (a, b) => a.relevance - b.relevance,
    },
    {
      title: "Intensity",
      dataIndex: "intensity",
      key: "intensity",
      sorter: (a, b) => a.intensity - b.intensity,
    },
    {
      title: "Likelihood",
      dataIndex: "likelihood",
      key: "likelihood",
      sorter: (a, b) => a.intensity - b.intensity,
    },
    {
      title: "Region",
      dataIndex: "region",
      key: "region",
    },
    {
      title: "Country",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Published",
      dataIndex: "published",
      key: "published",
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button type="link" onClick={() => handleView(record)}>
            View PDF
          </Button>
        </>
      ),
    },
  ];