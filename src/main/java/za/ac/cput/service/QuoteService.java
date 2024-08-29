package za.ac.cput.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import za.ac.cput.domain.Quote;
import za.ac.cput.repository.QuoteRepository;

import java.util.List;


@Service
public class QuoteService implements IQuoteService {

    @Autowired
    private QuoteRepository quoteRepository;

    @Override
    public Quote create(Quote quote) {
        return quoteRepository.save(quote);
    }

    @Override
    public Quote read(Integer quoteId) {
        return this.quoteRepository.findById(quoteId).orElse(null);
    }

    @Override
    public Quote update(Quote quote) {
        return quoteRepository.save(quote);
    }

    @Override
    public void delete(Integer quoteId) {
        quoteRepository.deleteById(quoteId);
    }

    @Override
    public List<Quote> getAll() {
        return quoteRepository.findAll();
    }
}
