package za.ac.cput.service;

import za.ac.cput.domain.Quote;

import java.util.List;

public interface IQuoteService extends IService<Quote, Integer> {
    Quote create(Quote quote);
    Quote update(Quote quote);
    List<Quote> getAll();
}
