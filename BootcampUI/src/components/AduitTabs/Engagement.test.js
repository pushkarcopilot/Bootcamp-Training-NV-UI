import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Engagement from "./Engagement";
import { getEngagements } from "../../API/Engagement.api";
import { BrowserRouter } from "react-router-dom";
import { auditTypeMap, statusMap } from "../const";
import moment from "moment";

jest.mock("../../API/Engagement.api", () => ({
  getEngagements: jest.fn(),
}));
const mockNavigate = jest.fn();
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("Engagement component", () => {
  const mockEngagements = [
    {
      engagementId: 1,
      clientName: "Client A",
      auditTypeId: 1,
      statusId: 1,
      auditStartDate: "2023-01-01",
      auditEndDate: "2023-01-10",
    },
    {
      engagementId: 2,
      clientName: "Client B",
      auditTypeId: 2,
      statusId: 2,
      auditStartDate: "2023-02-01",
      auditEndDate: "2023-02-10",
    },
  ];

  beforeEach(() => {
    getEngagements.mockResolvedValue(mockEngagements);
  });

  it("should render the Engagement component and fetch list of engagements", async () => {
    render(
      <BrowserRouter>
        <Engagement />
      </BrowserRouter>
    );

    expect(screen.getByText(/Create Engagement/i)).toBeInTheDocument();
    expect(screen.getByText(/Engagements:/i)).toBeInTheDocument();

    await waitFor(() => expect(getEngagements).toHaveBeenCalledTimes(1));

    await waitFor(() => {
      expect(screen.getByText("Client A")).toBeInTheDocument();
      expect(screen.getByText("Client B")).toBeInTheDocument();
      expect(screen.getByText(auditTypeMap[1])).toBeInTheDocument();
      expect(screen.getByText(statusMap[2])).toBeInTheDocument();
    });

    expect(
      screen.getByText(
        moment(mockEngagements[0].auditStartDate).format("DD/MM/YYYY")
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        moment(mockEngagements[1].auditEndDate).format("DD/MM/YYYY")
      )
    ).toBeInTheDocument();
  });

  it("should call the view button for an engagement", async () => {
    render(
      <BrowserRouter>
        <Engagement />
      </BrowserRouter>
    );
    await waitFor(() => {
      expect(screen.getByText("Client A")).toBeInTheDocument();
    });

    const viewButton = screen.getAllByText(/View/i)[0]; // First view button
    fireEvent.click(viewButton);

    expect(mockNavigate).toHaveBeenCalledWith("/view-engagement/1");
  });

  it("should navigate to create engagement page when the button is clicked", () => {
    const navigate = jest.fn();
    render(
      <MemoryRouter>
        <Engagement />
      </MemoryRouter>
    );

    const createButton = screen.getByText(/Create Engagement/i);
    fireEvent.click(createButton);

    expect(mockNavigate).toHaveBeenCalledWith("/create-engagement");
  });
});
