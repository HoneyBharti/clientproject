
'use client';

import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

// Define types based on the provided JSON structure
interface ColData {
  id?: string;
  value: string;
}

interface ReportRowData {
  ColData?: ColData[];
  Header?: { ColData: ColData[] };
  Rows?: { Row: ReportRowData[] };
  Summary?: { ColData: ColData[] };
  type: 'Data' | 'Section';
  group?: string;
}

interface ReportData {
  Header: {
    ReportName: string;
    StartPeriod: string;
    EndPeriod: string;
    Currency: string;
  };
  Rows: {
    Row: ReportRowData[];
  };
  Columns: {
    Column: any[];
  };
}

const ReportRow: React.FC<{ row: ReportRowData; level: number }> = ({ row, level }) => {
  const isSection = row.type === 'Section';
  const isData = row.type === 'Data';
  const hasSummary = !!row.Summary;

  const getPadding = (level: number) => ({ paddingLeft: `${level * 20}px` });

  const formatValue = (value: string) => {
    const num = parseFloat(value);
    if (isNaN(num)) return value;
    return new Intl.NumberFormat('en-US', {
      style: 'decimal',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(num);
  };
  
  if (isData && row.ColData) {
    return (
      <TableRow>
        <TableCell style={getPadding(level)}>{row.ColData[0]?.value}</TableCell>
        <TableCell className="text-right">{formatValue(row.ColData[1]?.value)}</TableCell>
      </TableRow>
    );
  }

  if (isSection) {
    const summaryCols = row.Summary?.ColData ?? [];

    return (
      <>
        {row.Header && (
          <TableRow className="bg-gray-50 hover:bg-gray-50">
            <TableCell colSpan={2} style={getPadding(level)} className="font-bold">
              {row.Header.ColData[0]?.value}
            </TableCell>
          </TableRow>
        )}
        {row.Rows?.Row.map((subRow, index) => (
          <ReportRow key={index} row={subRow} level={level + 1} />
        ))}
        {hasSummary && (
          <TableRow className="bg-gray-100 hover:bg-gray-100 font-bold">
            <TableCell style={getPadding(level)}>
              {summaryCols[0]?.value}
            </TableCell>
            <TableCell className="text-right">
              {formatValue(summaryCols[1]?.value ?? '')}
            </TableCell>
          </TableRow>
        )}
      </>
    );
  }

  return null;
};

export const ProfitAndLossReport: React.FC<{ data: ReportData }> = ({ data }) => {
  if (!data || !data.Header || !data.Rows) return <p>No report data available.</p>;

  const { Header: reportHeader, Rows } = data;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{reportHeader.ReportName || 'Financial Report'}</CardTitle>
        <CardDescription>
          For the period from {reportHeader.StartPeriod || 'N/A'} to {reportHeader.EndPeriod || 'N/A'} (Currency: {reportHeader.Currency || 'N/A'})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Account</TableHead>
              <TableHead className="text-right">Total</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Rows.Row.map((row, index) => (
              <ReportRow key={index} row={row} level={0} />
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};
